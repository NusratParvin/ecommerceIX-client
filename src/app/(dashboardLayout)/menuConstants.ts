/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  ClipboardList,
  MessageSquare,
  ShoppingCart,
  BarChart3,
  Tags,
  Key,
  Ticket,
  ShoppingBag,
  UserRoundPlus,
} from "lucide-react";

export type MenuType = {
  title: string;
  icon: any;
  url: string;
};

// Admin Menu Items
export const adminMenuItems: MenuType[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin/dashboard" },
  { title: "Categories", icon: Package, url: "/admin/categories" },
  { title: "Products", icon: Tags, url: "/admin/products" },
  { title: "Users", icon: Users, url: "/admin/users" },
  { title: "Shops", icon: ShoppingCart, url: "/admin/shops" },
  { title: "Orders", icon: ShoppingBag, url: "/admin/orders" },
  { title: "Coupons", icon: Ticket, url: "/admin/coupons" },
  { title: "Subscribers", icon: UserRoundPlus, url: "/admin/subscribers" },
  {
    title: "Customer Feedback",
    icon: MessageSquare,
    url: "/admin/customerFeedback",
  },
  { title: "Transactions", icon: BarChart3, url: "/admin/transactions" },
];

// Vendor Menu Items
export const vendorMenuItems: MenuType[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/dashboard" },
  { title: "My Shop", icon: Store, url: "/vendor/shop" },
  { title: "Products", icon: Package, url: "/vendor/products" },
  { title: "Orders", icon: ClipboardList, url: "/vendor/orders" },
  // {
  //   title: "Customer Feedback",
  //   icon: MessageSquare,
  //   url: "/vendor/customerFeedback",
  // },
  {
    title: "Manage Password",
    icon: Key,
    url: "/vendor/managePassword",
  },
];
// USer Menu Items
export const userMenuItems: MenuType[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/user/dashboard" },
  {
    title: "Recently Viewed",
    icon: Package,
    url: "/user/recentlyViewedProducts",
  },
  // { title: "Products", icon: Package, url: "/user/products" },
  {
    title: "My Purchase History",
    icon: ClipboardList,
    url: "/user/purchaseHistory",
  },
  {
    title: "Manage Password",
    icon: Key,
    url: "/user/managePassword",
  },
];
