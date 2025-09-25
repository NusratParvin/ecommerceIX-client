"use client";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
// import { CustomerNavbar } from "./userSidebar";
import { AdminVendorSidebar } from "./adminVendorSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const user = useAppSelector(useCurrentUser);

  if (!user) {
    return <Link href="/register"></Link>;
  }

  const isAuthUser =
    user.role === "ADMIN" || user.role === "VENDOR" || user.role === "USER";

  return (
    <div className="min-h-screen w-full flex">
      {isAuthUser && (
        <SidebarProvider>
          <div className="flex h-auto min-h-screen w-full ">
            <AdminVendorSidebar userRole={user.role}>
              {children}
            </AdminVendorSidebar>
            {/* <main className="flex-1 overflow-y-auto  p-8">{children}</main> */}
          </div>
        </SidebarProvider>
      )}
    </div>
  );
}
