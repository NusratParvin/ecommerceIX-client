"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  adminMenuItems,
  MenuType,
  userMenuItems,
  vendorMenuItems,
} from "./menuConstants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutCookies } from "@/services/AuthService";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { persistor } from "@/redux/store";
import Image from "next/image";

interface AdminVendorSidebarProps {
  userRole: string;
  children: ReactNode;
}

export function AdminVendorSidebar({
  userRole,
  children,
}: AdminVendorSidebarProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // const menuItems = userRole === "ADMIN" ? adminMenuItems : vendorMenuItems;

  let menuItems: MenuType[];

  if (userRole === "ADMIN") {
    menuItems = adminMenuItems;
  } else if (userRole === "VENDOR") {
    menuItems = vendorMenuItems;
  } else if (userRole === "USER") {
    menuItems = userMenuItems;
  } else {
    menuItems = [];
  }

  if (!user) return null;

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      const result = await logoutCookies();

      if (result.success) {
        dispatch(clearCart());
        dispatch(logout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.clear();
        persistor.purge();
        toast.success("Logged out successfully!", {
          id: toastId,
        });

        router.push("/");
      } else {
        toast.error("Failed to log out", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred during logout", { id: toastId });
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`relative z-50 h-full bg-white text-slate-700 transition-all flex flex-col ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Company Logo */}
        <div className="flex items-center justify-center py-3  shadow-2xl  border-b border-gray-100/10 ">
          <Link
            href="/"
            className={`transition-all duration-300 flex items-center justify-center ${
              isCollapsed ? "w-16" : "w-40"
            }`}
          >
            <div>
              <Image
                src="/assets/logo2.png"
                alt="logo"
                width={120}
                height={100}
              />{" "}
            </div>
          </Link>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto scroll-m-1 pt-4 bg-slate-600 text-white">
          <nav className="ps-0 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setActiveMenu(item.title)}
                className={`relative flex items-center gap-3 py-2 px-3 rounded-none ps-4 transition-all duration-300 ease-in-out overflow-hidden ${
                  activeMenu === item.title
                    ? "bg-deep-brown/80 text-white font-semibold"
                    : "hover:text-deep-brown hover:bg-gray-100"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <div
                  className={`absolute inset-0 transition-transform transform ${
                    activeMenu === item.title
                      ? "translate-x-0"
                      : "translate-x-full group-hover:translate-x-0"
                  } bg-deep-brown/80 z-0`}
                ></div>

                <div className="relative z-10 flex items-center">
                  <item.icon className="h-6 w-6 pe-2" />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="py-4 border-t border-gray-100/10 bg-slate-600 text-white">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 py-2 px-3 hover:bg-deep-brown rounded-none w-full ${
              isCollapsed ? "justify-center" : "ps-8"
            }`}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="font-semibold">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white border-b border-slate-400/20 shadow-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            {/* <Link href="/">Back to Homepage</Link> */}
            <p className="font-sans font-semibold text-slate-700 text-lg ">
              Welcome <span className="italic "> {user?.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-4 me-8">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.profilePhoto || "/placeholder.svg"} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuItem>
                  <Link
                    href={
                      userRole === "ADMIN"
                        ? "/admin/profile"
                        : "/vendor/profile"
                    }
                    className="text-sm font-medium hover:underline"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <p onClick={handleLogout}>Logout</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 py-3 px-1 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
