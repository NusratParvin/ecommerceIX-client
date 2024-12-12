"use client";

import { ShoppingCart, DollarSign, Package, Star } from "lucide-react";
import { StatCard } from "../../admin/dashboard/_components/statCards";
import { VendorRevenueChart } from "./_components/vendorRevenueChart";
import { TopProducts } from "./_components/topProducts";
import { RecentVendorOrders } from "./_components/recentVendorOrders";

const VendorDashboard = () => {
  return (
    <div className="flex-1 space-y-2 p-0 pt-2">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value="$12,345"
          icon={DollarSign}
          description="+15% from last month"
        />
        <StatCard
          title="Active Orders"
          value="25"
          icon={ShoppingCart}
          description="5 pending shipment"
        />
        <StatCard
          title="Products"
          value="48"
          icon={Package}
          description="3 low in stock"
        />
        <StatCard
          title="Avg Rating"
          value="4.8"
          icon={Star}
          description="From 235 reviews"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <VendorRevenueChart />
        <TopProducts />
      </div>
      <RecentVendorOrders />
    </div>
  );
};

export default VendorDashboard;
