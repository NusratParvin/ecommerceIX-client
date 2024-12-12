"use client";
import { Users, DollarSign, ShoppingCart, Store } from "lucide-react";
// import { RevenueChart } from "./_components/revenueChart";
import { RecentOrders } from "./_components/recentOrders";
import { StatCard } from "./_components/statCards";

const Index = () => {
  return (
    <div className="flex-1 space-y-4 p-0 ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          description="+20.1% from last month"
        />
        <StatCard
          title="Total Users"
          value="2,350"
          icon={Users}
          description="+180 new users"
        />
        <StatCard
          title="Active Orders"
          value="12"
          icon={ShoppingCart}
          description="3 pending approval"
        />
        <StatCard
          title="Active Shops"
          value="48"
          icon={Store}
          description="+2 this week"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        {/* <RevenueChart /> */}
        <RecentOrders />
      </div>
    </div>
  );
};

export default Index;
