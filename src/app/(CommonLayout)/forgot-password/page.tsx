"use client";

import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [emailSent, setEmailSent] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      //   console.log(data.email);
      const result = await forgotPassword(data.email).unwrap();

      if (result.success) {
        setEmailSent(true);
        console.log(result);
        toast.success(
          "A reset link has been sent to your email. Please check your inbox."
        );
      }
    } catch (error) {
      console.error("Error sending reset email", error);
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div>
      <div className="h-36 bg-deep-brown"></div>
      <div className="flex items-start justify-center min-h-screen pt-16 bg-gray-50">
        <div className="md:w-1/2 w-full p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-center text-lg mb-6">Forgot Your Password?</h2>
          {!emailSent ? (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-2 border rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "focus:ring-red-500 border-red-500"
                      : "focus:ring-deep-brown/40"
                  }`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="w-1/3 mx-auto">
                <button
                  className="w-full py-2 px-4 bg-warm-brown text-white   text-base rounded-md hover:bg-deep-brown disabled:bg-deep-brown/40"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? "Sending..." : "Send Reset Email"}
                </button>
              </div>
            </form>
          ) : (
            <h2 className="text-center text-base text-green-600">
              A reset link has been sent to your email. Please check your inbox.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
