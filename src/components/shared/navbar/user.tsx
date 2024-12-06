/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { logoutCookies } from "@/services/AuthService";
import { CustomJwtPayload } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserMenu = ({ user }: { user: CustomJwtPayload }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      const result = await logoutCookies();

      if (result.success) {
        dispatch(logout());
        toast.success("Logged out successfully!", {
          id: toastId,
        });

        router.push("/");
      } else {
        toast.error("Failed to log out", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred during logout", { id: toastId });
    }
  };

  const handleDashboard = () => {
    if (user?.role === "USER") {
      router.push("/user/dashboard");
    } else if (user?.role === "VENDOR") {
      router.push("/vendor/dashboard");
    } else if (user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      toast.error("Invalid role. Please contact support.");
    }
  };

  return (
    <div className="  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <div className="  "> */}
          <Avatar className="  h-7 w-7 cursor-pointer">
            <AvatarImage src={user?.profilePhoto} alt={user?.name} />
            <AvatarFallback className="text-sm">
              {user?.profilePhoto}
            </AvatarFallback>
          </Avatar>
          {/* </div> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 border me-8"
          align="end"
          sideOffset={20}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDashboard}>
            Dashboard
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
