"use client";

import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/features/auth/authSlice";
import { decodeToken } from "@/lib/verifyToken";
import { useState } from "react";
import Link from "next/link";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(data).unwrap();

      if (res.success) {
        const decodedToken = decodeToken(res.data.accessToken);
        const { email, role, name, profilePhoto } = decodedToken;
        console.log(decodeToken);
        dispatch(
          setUser({
            user: { email, role, name, profilePhoto },
            token: res.data.accessToken,
          })
        );

        toast.success("Login successful!", {
          id: toastId,
          // duration: 1000,
          className: "text-green-700  ",
        });

        onClose();
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-md shadow-lg px-16 py-10">
        <DialogHeader>
          <DialogTitle className="text-deep-brown text-center">
            Login
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-deep-navy font-semibold">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <div className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <Label htmlFor="password" className="text-deep-navy font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 transform  text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <div className="text-xs text-red-600 mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="relative w-full rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group py-5"
          >
            {/* Animated Background */}
            <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>

            {/* Button Text */}
            <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase">
              Login
            </span>
          </Button>
        </form>

        <DialogClose asChild>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          ></button>
        </DialogClose>
        <div className="flex justify-center text-sm mt-4">
          New customer?
          <Link
            href="/register"
            onClick={() => onClose()}
            className="text-warm-brown hover:underline ml-1"
          >
            Register
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
