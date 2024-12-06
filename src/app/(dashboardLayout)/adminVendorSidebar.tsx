"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminMenuItems, vendorMenuItems } from "./menuConstants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutCookies } from "@/services/AuthService";

interface AdminVendorSidebarProps {
  userRole: string;
  children: ReactNode;
}

export function AdminVendorSidebar({
  userRole,
  children,
}: AdminVendorSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const menuItems = userRole === "ADMIN" ? adminMenuItems : vendorMenuItems;

  if (!user) return null;

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred during logout", { id: toastId });
    }
  };

  return (
    // <div className="flex min-h-screen w-full">
    //   {/* Sidebar */}
    //   <div
    //     className={`relative z-50 h-auto bg-deep-brown text-cream transition-all flex flex-col ${
    //       isCollapsed ? "w-16" : "w-52"
    //     }`}
    //   >
    //     {/* Company Logo */}

    //     <div className="flex items-center justify-center py-4 border-b border-cream/20 shadow-sm">
    //       <Link
    //         href="/"
    //         className={`transition-all duration-300 flex items-center justify-center ${
    //           isCollapsed ? "w-16" : "w-40"
    //         }`}
    //       >
    //         <div
    //           className={`flex items-center justify-center transition-all duration-300 ${
    //             isCollapsed
    //               ? "w-10 h-10 md:w-12 md:h-12"
    //               : "w-16 h-16 md:w-20 md:h-20"
    //           } rounded-full border-2 border-dotted border-cream/70 bg-deep-brown`}
    //         >
    //           <span
    //             className={`text-cream font-semibold transition-all duration-300 ${
    //               isCollapsed ? "text-lg md:text-xl" : "text-2xl md:text-4xl"
    //             }`}
    //           >
    //             {" "}
    //             IX
    //           </span>
    //         </div>
    //       </Link>
    //     </div>

    //     {/* </div> */}

    //     {/* Sidebar Menu */}

    //     <div className="flex-1 overflow-y-auto pt-4">
    //       <nav className="ps-0 space-y-2">
    //         {menuItems.map((item) => (
    //           <Link
    //             key={item.title}
    //             href={item.url}
    //             onClick={() => setActiveMenu(item.title)}
    //             className={`relative flex items-center gap-3 py-2 px-3 rounded-none ps-4 transition-all duration-300 ease-in-out overflow-hidden ${
    //               activeMenu === item.title
    //                 ? "bg-warm-brown/80 text-white font-semibold"
    //                 : "hover:text-deep-brown hover:bg-gray-100"
    //             } ${isCollapsed ? "justify-center" : ""}`}
    //           >
    //             {/* Sliding Background */}
    //             <div
    //               className={`absolute inset-0 transition-transform transform ${
    //                 activeMenu === item.title
    //                   ? "translate-x-0"
    //                   : "translate-x-full group-hover:translate-x-0"
    //               } bg-warm-brown/80 z-0`}
    //             ></div>

    //             {/* Icon and Text */}
    //             <div className="relative z-10 flex items-center">
    //               <item.icon className="h-6 w-6 pe-2" />
    //               {!isCollapsed && <span>{item.title}</span>}
    //             </div>
    //           </Link>
    //         ))}
    //       </nav>
    //     </div>

    //     {/* Sidebar Footer */}

    //     <div className="py-4 border-t border-deep-brown">
    //       <button
    //         onClick={handleLogout}
    //         className={`flex items-center gap-3 py-2 px-3 hover:bg-warm-brown rounded-none  w-full ${
    //           isCollapsed ? "justify-center" : "ps-8"
    //         }`}
    //       >
    //         <LogOut className="h-5 w-5 text-cream" />
    //         {!isCollapsed && (
    //           <span className="text-cream font-semibold">Logout</span>
    //         )}
    //       </button>
    //     </div>
    //   </div>

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col ">
    //     {/* Top Navbar */}
    //     <header className="flex items-center justify-between bg-white shadow-md px-4 py-3">
    //       <div className="flex items-center gap-3">
    //         <button
    //           onClick={() => setIsCollapsed(!isCollapsed)}
    //           aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
    //           className="text-gray-600"
    //         >
    //           {isCollapsed ? (
    //             <ChevronRight className="h-5 w-5" />
    //           ) : (
    //             <ChevronLeft className="h-5 w-5" />
    //           )}
    //         </button>
    //         <input
    //           type="text"
    //           placeholder="Search"
    //           className="w-full max-w-md p-2 border rounded-md text-sm text-gray-600 focus:outline-none"
    //         />
    //       </div>
    //       <div className="flex items-center gap-4 me-8">
    //         <DropdownMenu>
    //           <DropdownMenuTrigger>
    //             <Avatar className="h-8 w-8 cursor-pointer">
    //               <AvatarImage src={user.profilePhoto || "/placeholder.svg"} />
    //               <AvatarFallback>
    //                 {user.name.slice(0, 2).toUpperCase()}
    //               </AvatarFallback>
    //             </Avatar>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent>
    //             <DropdownMenuItem>
    //               <Link
    //                 href={
    //                   userRole === "ADMIN"
    //                     ? "/admin/profile"
    //                     : "/vendor/profile"
    //                 }
    //                 className="text-sm font-medium hover:underline"
    //               >
    //                 Profile
    //               </Link>{" "}
    //             </DropdownMenuItem>
    //             <DropdownMenuItem>
    //               <p onClick={handleLogout}>Logout</p>
    //             </DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //     </header>

    //     {/* Page Content */}
    //     <main className="flex-1 p-6 bg-gray-100">{children}</main>
    //   </div>
    // </div>

    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={`relative z-50 h-full bg-deep-brown text-cream transition-all flex flex-col ${
          isCollapsed ? "w-16" : "w-52"
        }`}
      >
        {/* Company Logo */}
        <div className="flex items-center justify-center py-4 border-b border-cream/20 shadow-sm">
          <Link
            href="/"
            className={`transition-all duration-300 flex items-center justify-center ${
              isCollapsed ? "w-16" : "w-40"
            }`}
          >
            <div
              className={`flex items-center justify-center transition-all duration-300 ${
                isCollapsed
                  ? "w-10 h-10 md:w-12 md:h-12"
                  : "w-16 h-16 md:w-20 md:h-20"
              } rounded-full border-2 border-dotted border-cream/70 bg-deep-brown`}
            >
              <span
                className={`text-cream font-semibold transition-all duration-300 ${
                  isCollapsed ? "text-lg md:text-xl" : "text-2xl md:text-4xl"
                }`}
              >
                IX
              </span>
            </div>
          </Link>
        </div>

        {/* Sidebar Menu */}
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
                <div
                  className={`absolute inset-0 transition-transform transform ${
                    activeMenu === item.title
                      ? "translate-x-0"
                      : "translate-x-full group-hover:translate-x-0"
                  } bg-warm-brown/80 z-0`}
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
        <div className="py-4 border-t border-deep-brown">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 py-2 px-3 hover:bg-warm-brown rounded-none w-full ${
              isCollapsed ? "justify-center" : "ps-8"
            }`}
          >
            <LogOut className="h-5 w-5 text-cream" />
            {!isCollapsed && (
              <span className="text-cream font-semibold">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
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
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <p onClick={handleLogout}>Logout</p>
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
