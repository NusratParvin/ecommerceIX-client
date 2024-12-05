"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminMenuItems, vendorMenuItems } from "./menuConstants";

export function AdminVendorSidebar({
  userRole,
  children,
}: {
  userRole: string;
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const user = useAppSelector(useCurrentUser);

  const menuItems = userRole === "ADMIN" ? adminMenuItems : vendorMenuItems;

  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div
        className={`relative z-50 h-auto bg-deep-brown text-cream transition-all flex flex-col ${
          isCollapsed ? "w-16" : "w-52"
        }`}
      >
        {/* Company Logo */}
        <div className="flex items-center justify-center py-4 border-b border-cream/20 shadow-sm">
          {!isCollapsed ? (
            <Link href="/">
              <Image
                src="/company-logo.png"
                alt="Company Logo"
                width={150}
                height={50}
                className="h-auto"
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src="/company-logo-icon.png"
                alt="Logo Icon"
                width={40}
                height={40}
                className="h-auto"
              />
            </Link>
          )}
        </div>

        {/* Sidebar Menu */}
        {/* <div className="flex-1 overflow-y-auto pt-4">
          <nav className="ps-0 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setActiveMenu(item.title)}
                // className={`flex items-center gap-3 py-2 px-3 rounded-none ps-4 ${
                //   activeMenu === item.title
                //     ? "bg-warm-brown/80 text-white font-semibold"
                //     : "hover:bg-gray-100 hover:text-deep-brown"
                // } ${isCollapsed ? "justify-center" : ""}`}
                className={`flex items-center gap-3 py-2 px-3 rounded-none ps-4 transition-all duration-300 ease-in-out ${
                  activeMenu === item.title
                    ? "bg-warm-brown/80 text-white font-semibold"
                    : "hover:bg-gray-100 hover:text-deep-brown"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div> */}

        <div className="flex-1 overflow-y-auto pt-4">
          <nav className="ps-0 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setActiveMenu(item.title)}
                className={`relative flex items-center gap-3 py-2 px-3 rounded-none ps-4 transition-all duration-300 ease-in-out overflow-hidden ${
                  activeMenu === item.title
                    ? "bg-warm-brown/80 text-white font-semibold"
                    : "hover:text-deep-brown hover:bg-gray-100"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                {/* Sliding Background */}
                <div
                  className={`absolute inset-0 transition-transform transform ${
                    activeMenu === item.title
                      ? "translate-x-0"
                      : "translate-x-full group-hover:translate-x-0"
                  } bg-warm-brown/80 z-0`}
                ></div>

                {/* Icon and Text */}
                <div className="relative z-10 flex items-center">
                  <item.icon className="h-6 w-6 pe-2" />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="py-4 border-t border-deep-brown">
          <Link
            href="/logout"
            className={`flex items-center gap-3 py-2 px-3 hover:bg-warm-brown rounded-none ${
              isCollapsed ? "justify-center" : "ps-8"
            }`}
          >
            <LogOut className="h-5 w-5 text-cream" />
            {!isCollapsed && (
              <span className="text-cream font-semibold">Logout</span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow-md px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="text-gray-600"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
            <input
              type="text"
              placeholder="Search"
              className="w-full max-w-md p-2 border rounded-md text-sm text-gray-600 focus:outline-none"
            />
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
                <DropdownMenuItem>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/logout">Logout</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
