// "use client";

// import { Eye, EyeOff } from "lucide-react";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import { useAppDispatch } from "@/redux/hooks";
// import { useRouter } from "next/navigation";
// import { setUser } from "@/redux/features/auth/authSlice";
// import { decodeToken } from "@/lib/verifyToken";
// import { useState } from "react";
// import Link from "next/link";
// import { CustomJwtPayload } from "@/types";
// import { setCookies } from "@/services/AuthService";

// type LoginFormInputs = {
//   email: string;
//   password: string;
// };

// export default function LoginModal() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>();

//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [login] = useLoginMutation();

//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = async (data: LoginFormInputs) => {
//     const toastId = toast.loading("Logging in...");

//     try {
//       const res = await login(data).unwrap();

//       if (res.success) {
//         const decodedToken = decodeToken(
//           res.data.accessToken
//         ) as CustomJwtPayload;
//         console.log(res, "login");
//         // const decodedToken = await decodeToken(res.data.accessToken);
//         const { email, role, name, profilePhoto } = decodedToken;
//         console.log(
//           await setCookies(res.data.accessToken, res.data.refreshToken),
//           "setcookies"
//         );

//         localStorage.setItem("accessToken", res.data.accessToken);
//         localStorage.setItem("refreshToken", res.data.refreshToken);

//         dispatch(
//           setUser({
//             user: { email, role, name, profilePhoto },
//             token: res.data.accessToken,
//           })
//         );

//         toast.success("Login successful!", {
//           id: toastId,
//           // duration: 1000,
//           className: "text-green-700  ",
//         });

//         router.push("/");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Login failed. Please try again.", {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <div>
//       <div className="h-36 bg-deep-brown"></div>
//       <div className="flex items-center justify-center min-h-screen bg-warm-gray/20">
//         <div className="w-full max-w-lg mb-16 mt-0 bg-white p-6 rounded-lg shadow-md">
//           <div>
//             <h1 className="text-2xl text-charcoal font-bold text-center">
//               Login
//             </h1>
//             <p className="mt-4 text-center text-sm text-red-600">
//               Admin Credentials are below: <br />
//               <strong>Email:</strong> a@a.com <br />
//               <strong>Password:</strong> 111111
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
//             {/* Email Field */}
//             <div>
//               <Label htmlFor="email" className="text-deep-navy font-semibold">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 placeholder="Email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && (
//                 <div className="text-xs text-red-600 mt-1">
//                   {errors.email.message}
//                 </div>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <Label
//                 htmlFor="password"
//                 className="text-deep-navy font-semibold"
//               >
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-11 transform  text-gray-400"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//               {errors.password && (
//                 <div className="text-xs text-red-600 mt-1">
//                   {errors.password.message}
//                 </div>
//               )}
//             </div>

//             <Button
//               type="submit"
//               className="relative w-full rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group py-5"
//             >
//               {/* Animated Background */}
//               <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>

//               {/* Button Text */}
//               <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase">
//                 Login
//               </span>
//             </Button>
//           </form>

//           <button
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             aria-label="Close"
//           ></button>

//           <div className="flex justify-between items-center text-sm mt-4">
//             <div>
//               New customer?
//               <Link
//                 href="/register"
//                 className="text-warm-brown hover:underline ml-1"
//               >
//                 Register
//               </Link>
//             </div>
//             <div>
//               <Link
//                 href="/forgot-password"
//                 className="text-warm-brown hover:underline ml-1"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { CustomJwtPayload } from "@/types";
import { setCookies } from "@/services/AuthService";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Allows us to programmatically set form values
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
        const decodedToken = decodeToken(
          res.data.accessToken
        ) as CustomJwtPayload;
        const { email, role, name, profilePhoto } = decodedToken;

        await setCookies(res.data.accessToken, res.data.refreshToken);

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        dispatch(
          setUser({
            user: { email, role, name, profilePhoto },
            token: res.data.accessToken,
          })
        );

        toast.success("Login successful!", { id: toastId });
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.", {
        id: toastId,
      });
    }
  };

  // Function to fill the form with demo credentials
  const fillDemoCredentials = (role: "admin" | "vendor" | "user") => {
    if (role === "admin") {
      setValue("email", "a@a.com");
      setValue("password", "111111");
    } else if (role === "vendor") {
      setValue("email", "n@n.com");
      setValue("password", "111111");
    } else if (role === "user") {
      setValue("email", "u@u.com");
      setValue("password", "111111");
    }
    toast.info(
      `${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled.`
    );
  };

  return (
    <div>
      <div className="h-36 bg-deep-brown"></div>
      <div className="flex items-center justify-center min-h-screen bg-warm-gray/20">
        <div className="w-full max-w-lg mb-16 mt-0 bg-white p-6 rounded-lg shadow-md">
          <div>
            <h1 className="text-2xl text-charcoal font-bold text-center">
              Login
            </h1>
            <p className="mt-4 text-center text-sm text-red-600">
              Click on the buttons below to auto-fill demo credentials:
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => fillDemoCredentials("user")}
                className="text-sm px-4 py-2 bg-deep-brown text-white hover:bg-warm-brown"
              >
                User Login
              </Button>{" "}
              <Button
                variant="outline"
                onClick={() => fillDemoCredentials("vendor")}
                className="text-sm px-4 py-2 bg-deep-brown text-white hover:bg-warm-brown"
              >
                Vendor Login
              </Button>
              <Button
                variant="outline"
                onClick={() => fillDemoCredentials("admin")}
                className="text-sm px-4 py-2 bg-deep-brown text-white hover:bg-warm-brown"
              >
                Admin Login
              </Button>
            </div>
          </div>

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
              <Label
                htmlFor="password"
                className="text-deep-navy font-semibold"
              >
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
                className="absolute right-3 top-11 transform text-gray-400"
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

          <div className="flex justify-between items-center text-sm mt-4">
            <div>
              New customer?
              <Link
                href="/register"
                className="text-warm-brown hover:underline ml-1"
              >
                Register
              </Link>
            </div>
            <div>
              <Link
                href="/forgot-password"
                className="text-warm-brown hover:underline ml-1"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
