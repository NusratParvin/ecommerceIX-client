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
} from "lucide-react";

type MenuType = {
  title: string;
  icon: any;
  url: string;
};

// Admin Menu Items
export const adminMenuItems: MenuType[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin/dashboard" },
  { title: "Categories", icon: Package, url: "/admin/categories" },
  { title: "Products", icon: Tags, url: "/admin/products" },
  { title: "Users", icon: Users, url: "/admin/users" }, // Manage users (vendors/customers)
  { title: "Shops", icon: ShoppingCart, url: "/admin/shops" }, // Blacklist vendor shops
  { title: "Transactions", icon: BarChart3, url: "/admin/transactions" },
];

// Vendor Menu Items
export const vendorMenuItems: MenuType[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/dashboard" }, // Dashboard is fine
  { title: "My Shop", icon: Store, url: "/vendor/shop" }, // Use Store for "My Shop"
  { title: "Products", icon: Package, url: "/vendor/products" }, // Package is relevant for "Products"
  { title: "Orders", icon: ClipboardList, url: "/vendor/orders" }, // ClipboardList for "Orders"
  {
    title: "Customer Feedback",
    icon: MessageSquare, // MessageSquare for "Customer Feedback"
    url: "/vendor/customerFeedback",
  },
];
