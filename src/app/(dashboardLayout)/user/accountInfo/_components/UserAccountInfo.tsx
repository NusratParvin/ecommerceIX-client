"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersApi";
import { ChangePasswordForm } from "./changePasswordForm";
import { useState } from "react";
import Image from "next/image";

export function UserAccountInfo() {
  const user = useAppSelector(useCurrentUser);
  const {
    data: userDetails,
    isLoading,
    error,
  } = useGetUserByEmailQuery(user?.email);

  // API might wrap response in { data: {...user} }
  const UserDetailsInfo = userDetails?.data || userDetails;
  const [isPwdOpen, setIsPwdOpen] = useState(false);

  if (isLoading) {
    return (
      <p className="text-center py-8 text-muted-foreground">
        Loading user info...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-8 text-destructive">
        Failed to load user info. Please try again later.
      </p>
    );
  }

  return (
    <Card className="bg-transparent border-none rounded-none shadow-none p-2 tracking-tight ">
      {/* Header with profile photo */}
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between p-0 mb-4">
        <div>
          <CardTitle className="text-lg md:text-xl font-semibold text-slate-700">
            Account Information
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 bg-white py-8 border border-dashed border-slate-300">
          {/* Basic Info */}
          <ul className="list-disc sm:pl-12 pl-6 space-y-3 text-base md:text-lg text-neutral-700 sm:col-span-2 col-span-1">
            <li>
              <span className="font-semibold text-neutral-600">Full Name:</span>{" "}
              <span>{UserDetailsInfo?.name ?? "N/A"}</span>
            </li>
            <li>
              <span className="font-semibold text-neutral-600">Phone:</span>{" "}
              <span>+1 65558845</span>
            </li>
            <li>
              <span className="font-semibold text-neutral-600">Address:</span>{" "}
              <span>
                {UserDetailsInfo?.orders?.[0]?.shippingInfo?.address ??
                  "Not provided"}
              </span>
            </li>
          </ul>

          <div className="relative w-28 h-28 col-span-1 ">
            {UserDetailsInfo?.profilePhoto && (
              <Image
                src={UserDetailsInfo.profilePhoto}
                alt="User profile"
                fill
                className=" rounded-sm object-cover mt-3 md:mt-0 sm:ms-0 ml-6"
              />
            )}
          </div>
        </div>

        {/* <div className="mt-3">
          <Button variant="link" className="px-0 text-[#ee6c4d]">
            Edit
          </Button>
        </div> */}

        <Separator className="my-6" />

        {/* Login Info */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-700">
            Login Details
          </h2>

          <div className="mt-3 flex flex-col  md:items-start md:justify-between gap-2 text-base md:text-lg text-neutral-700 pl-6 bg-white py-8 border border-dashed border-slate-300">
            <div>
              <span className="font-semibold text-neutral-600">Email :</span>{" "}
              <span>{UserDetailsInfo?.email}</span>
            </div>
            <div className=" flex sm:flex-row flex-col sm:gap-12 gap-6 sm:justify-between justify-start sm:items-center items-start">
              <div>
                <span className="font-semibold text-neutral-600">
                  Password :
                </span>
                <span aria-hidden="true">••••••••</span>
              </div>
              <Button
                variant="link"
                className="px-0 text-[#ee6c4d]"
                onClick={() => setIsPwdOpen(true)}
              >
                Change password
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <ChangePasswordForm open={isPwdOpen} onOpenChange={setIsPwdOpen} />
    </Card>
  );
}
