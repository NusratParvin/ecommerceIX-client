"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function ChangePasswordForm({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PasswordFormValues>({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");
  //   const confirmNewPassword = watch("confirmNewPassword");

  const onSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    setIsLoading(true);
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      // console.log(res);
      toast.success("Password changed successfully");
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || "Failed to change password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {" "}
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className=" md:p-6 p-2 md:w-[50%] w-[70%] md:h-[85%] h-[70%]">
        <DialogHeader>
          <DialogTitle>
            <h1 className="md:text-lg text-base  text-slate-700 font-semibold mb-3">
              Change Password
            </h1>
          </DialogTitle>
          <DialogDescription>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:space-y-4 space-y-2 max-w-lg shadow-none bg-slate-100  md:p-6 p-3"
              >
                {/* Current Password */}
                <div className="text-left">
                  <div className="flex flex-row justify-start gap-4 items-center">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    {errors.currentPassword && (
                      <p className="text-sm text-red-600 ">
                        {/* {errors.currentPassword.message} */} *
                      </p>
                    )}
                  </div>

                  <div className="mt-1 relative  ">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      {...register("currentPassword", {
                        required: "Current password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="shadow-md focus:border-none focus:ring-0 block w-full text-sm border-gray-100  rounded-none p-2 h-8"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {/* {errors.currentPassword && (
                    <p className="text-xs text-red-600 absolute top-24 right-14 italic">
                      {errors.currentPassword.message}
                    </p>
                  )} */}
                </div>

                {/* New Password */}
                <div className="text-left">
                  <div className="flex flex-row justify-start gap-4 items-center">
                    {" "}
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    {errors.newPassword && (
                      <p className="text-sm text-red-600">
                        {/* {errors.newPassword.message} */} *
                      </p>
                    )}
                  </div>
                  <div className="mt-1 relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="shadow-md focus:border-none focus:ring-0  block w-full text-sm border-gray-100  rounded-none p-2 h-8"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="text-left">
                  <div className="flex flex-row justify-start gap-4 items-center">
                    {" "}
                    <label
                      htmlFor="confirmNewPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    {errors.confirmNewPassword && (
                      <p className="text-sm text-red-600">
                        {/* {errors.confirmNewPassword.message} */} *
                      </p>
                    )}
                  </div>
                  <div className="mt-1 relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmNewPassword"
                      {...register("confirmNewPassword", {
                        required: "Please confirm your new password",
                        validate: (value) =>
                          value === newPassword || "Passwords do not match",
                      })}
                      className="shadow-md focus:border-none focus:ring-0  block w-full text-sm border-gray-100  rounded-none p-2 h-8"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-none shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700  disabled:opacity-50"
                >
                  {isLoading ? "Changing Password..." : "Change Password"}
                </button>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
