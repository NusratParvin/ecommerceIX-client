"use client";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { CustomerNavbar } from "./userSidebar";
import { AdminVendorSidebar } from "./adminVendorSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const user = useAppSelector(useCurrentUser);

  if (!user) {
    return <Link href="/register"></Link>;
  }

  const isAdminOrVendor = user.role === "ADMIN" || user.role === "VENDOR";

  return (
    <div className="min-h-screen w-full flex">
      {isAdminOrVendor ? (
        <SidebarProvider>
          <div className="flex h-auto min-h-screen w-full ">
            <AdminVendorSidebar userRole={user.role} children={children} />
            {/* <main className="flex-1 overflow-y-auto  p-8">{children}</main> */}
          </div>
        </SidebarProvider>
      ) : (
        <div className="min-h-screen flex flex-col">
          <CustomerNavbar />
          <main className="flex-1">{children}</main>
        </div>
      )}
    </div>
  );
}

// "use client";
// import { ReactNode } from "react";

// import { useRouter } from "next/navigation";
// import { useCurrentUser } from "@/redux/features/auth/authSlice";
// import { Sidebar } from "./sidebar";
// import { useAppSelector } from "@/redux/hooks";

// export default function Layout({ children }: { children: ReactNode }) {
//   const user = useAppSelector(useCurrentUser);

//   const router = useRouter();

//   // Define sidebar navigation links based on roles
//   const navigation = {
//     ADMIN: [
//       { label: "Dashboard", href: "/admin/dashboard" },
//       { label: "Manage Users", href: "/admin/users" },
//       { label: "Categories", href: "/admin/categories" },
//     ],
//     VENDOR: [
//       { label: "Dashboard", href: "/vendor/dashboard" },
//       { label: "Manage Products", href: "/vendor/products" },
//       { label: "Orders", href: "/vendor/orders" },
//     ],
//     USER: [
//       { label: "Dashboard", href: "/user/newsfeed" },
//       { label: "Orders", href: "/user/orders" },
//       { label: "Profile", href: "/user/profile" },
//     ],
//   };

//   const links = user?.role ? navigation[user.role] : [];

//   if (!user) {
//     // Redirect to login if no user is available
//     router.push("/login");
//     return null;
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar links={links} />

//       {/* Dynamic Rendering Area */}
//       <div className="flex-1 overflow-auto bg-gray-100 p-4">{children}</div>
//     </div>
//   );
// }
