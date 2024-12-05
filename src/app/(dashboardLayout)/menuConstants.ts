import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  LogOut,
  Package,
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
  { title: "Users", icon: Users, url: "/admin/users" }, // Manage users (vendors/customers)
  { title: "Shops", icon: ShoppingCart, url: "/admin/shops" }, // Blacklist vendor shops
  { title: "Categories", icon: Package, url: "/admin/categories" }, // Manage categories
  { title: "Transactions", icon: BarChart3, url: "/admin/transactions" }, // Monitor transactions
  { title: "Reports", icon: Tags, url: "/admin/reports" }, // Platform activity review
];

// Vendor Menu Items
export const vendorMenuItems: MenuType[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/dashboard" },
  { title: "Products", icon: Package, url: "/vendor/products" },
  { title: "Orders", icon: ShoppingCart, url: "/vendor/orders" },
  { title: "Analytics", icon: BarChart3, url: "/vendor/analytics" },
];
