/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import Image from "next/image";
import LoginModal from "@/components/shared/login/login";
import { decodeToken } from "@/lib/verifyToken";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { CustomJwtPayload } from "@/types";
import { setCookies } from "@/services/AuthService";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  role: string;
  profilePhoto: File | null;
};

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [registerUser] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>();

  const profilePhoto = watch("profilePhoto");

  // const onSubmit = async (data: RegisterFormInputs) => {
  //   const toastId = toast.loading("Registering...");

  //   const userData = {
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     role: data.role,
  //   };

  //   const formData = new FormData();

  //   formData.append("data", JSON.stringify(userData));
  //   if (data.profilePhoto) formData.append("file", data.profilePhoto);

  //   try {
  //     const res = await registerUser(formData).unwrap();
  //     console.log(res);
  //     if (res.success) {
  //       toast.success("Registration successful!", {
  //         id: toastId,
  //         className: "text-green-700",
  //       });
  //       reset();

  //       setIsLoginModalOpen(true);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error?.data?.message || "Registration failed.", {
  //       id: toastId,
  //       className: "text-red-700",
  //     });
  //   }
  // };

  const onSubmit = async (data: RegisterFormInputs) => {
    const toastId = toast.loading("Registering...");

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(userData));
    if (data.profilePhoto) formData.append("file", data.profilePhoto);

    try {
      const res = await registerUser(formData).unwrap();
      // console.log(res);

      if (res.success) {
        toast.success("Registration successful!", {
          id: toastId,
          className: "text-green-700",
        });
        reset();

        // Check if the role is VENDOR and token is present
        if (userData.role === "VENDOR" && res.data.accessToken) {
          const decodedToken = decodeToken(
            res.data.accessToken,
          ) as CustomJwtPayload;
          localStorage.setItem("accessToken", res.data.accessToken);
          await setCookies(res.data.accessToken, "");
          const { email, role, name, profilePhoto } = decodedToken;
          console.log(decodeToken);
          dispatch(
            setUser({
              user: { email, role, name, profilePhoto },
              token: res.data.accessToken,
            }),
          );

          // Redirect to vendor dashboard
          router.push("/vendor/shop");
        } else {
          // Redirect to login for USER
          router.push("/login");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Registration failed.", {
        id: toastId,
        className: "text-red-700",
      });
    }
  };

  return (
    <div>
      <div className="h-36 bg-deep-brown"></div>
      <div className="flex items-center justify-center min-h-screen bg-warm-gray/20">
        <div className="w-full max-w-lg mb-16 mt-8 bg-white p-6 rounded-lg shadow-md md:mx-0 mx-6">
          <div>
            <h1 className="text-2xl text-charcoal font-bold text-center ">
              Create Account
            </h1>
            <p className="mt-2 text-center text-sm text-charcoal/60 mb-6">
              Join our community of fashion enthusiasts
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Full Name Field */}
            <div>
              <Input
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <div
                className={`text-xs text-red-600 mt-1 min-h-[15px] ${
                  errors.name ? "visible" : "invisible"
                }`}
              >
                {errors.name?.message}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <Input
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <div
                className={`text-xs text-red-600 mt-1 min-h-[15px] ${
                  errors.email ? "visible" : "invisible"
                }`}
              >
                {errors.email?.message}
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              <div
                className={`text-xs text-red-600 mt-1 min-h-[15px] ${
                  errors.password ? "visible" : "invisible"
                }`}
              >
                {errors.password?.message}
              </div>
            </div>

            {/* Role Selection Field */}
            <div>
              {/* <Label htmlFor="role" className="text-deep-navy font-semibold">
                Select Role
              </Label> */}
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className="w-full px-4 py-2 border rounded-md text-sm text-charcoal/80"
              >
                <option value=""> How would you like to join?</option>
                <option value="USER"> Browse and shop products</option>
                <option value="VENDOR"> Set up a shop and sell products</option>
              </select>
              <div
                className={`text-xs text-red-600 mt-1 min-h-[15px] ${
                  errors.role ? "visible" : "invisible"
                }`}
              >
                {errors.role?.message}
              </div>
            </div>

            {/* Image Upload Field */}
            <div className="flex flex-col items-center gap-4 border border-dashed p-4 rounded-md">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
                {profilePhoto instanceof File ? (
                  <Image
                    src={URL.createObjectURL(profilePhoto)}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm flex items-center justify-center w-full h-full">
                    No Image
                  </span>
                )}
              </div>
              <label className="cursor-pointer">
                <span className="text-deep-brown text-lg">Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("profilePhoto")}
                  onChange={(e) =>
                    setValue("profilePhoto", e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="relative w-full rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group py-4"
            >
              <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>
              <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase">
                Register
              </span>
            </Button>
          </form>

          <div className="mt-4 text-sm flex justify-center items-center gap-2">
            Already have an account?{" "}
            <p
              className="text-deep-brown hover:underline "
              onClick={(e) => {
                e.preventDefault();
                setIsLoginModalOpen(true);
              }}
            >
              Log in
            </p>
          </div>

          {isLoginModalOpen && (
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
