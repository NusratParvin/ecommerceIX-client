"use client";
import {
  DollarSign,
  Users,
  ShoppingCart,
  Store,
  MessageSquare,
  CreditCard,
  BarChart3,
  PieChart,
} from "lucide-react";
import { RecentOrders } from "./_components/recentOrders";
import { StatCard } from "./_components/statCards";

import { useGetAdminDashboardAnalyticsInfoQuery } from "@/redux/features/analytics/analyticsApi";
import { SalesTrend } from "./_components/salesTrend";
import ShopPerformance from "./_components/shopPerformance";
import CategoryDistribution from "./_components/categoryDistribution";
import PlatformInsights from "./_components/platformInsights";
import { RecentReviews } from "./_components/recentReviews";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import QuickLinks from "./_components/quickLinks";
import { UserGrowth } from "./_components/userGrowth";

const AdminDashboard = () => {
  // const { data: usersData } = useGetUsersQuery({});
  // console.log(usersData?.data);
  const { data: adminAnalyticsData } = useGetAdminDashboardAnalyticsInfoQuery(
    {},
  );

  const currentUser = useAppSelector(useCurrentUser);
  // console.log(currentUser);

  // const users = usersData?.data || [];
  const { userStats, shopStats, orderStats, revenueStats } =
    adminAnalyticsData?.data || [];

  const getGrowthVariables = (value = 0) =>
    value > 0
      ? `+${value}% increase from prev 30d`
      : value < 0
        ? `${value}% decrease from prev 30d`
        : `No change from prev 30d`;

  const getGrowthTextColor = (value = 0) =>
    value > 0
      ? "text-green-600"
      : value < 0
        ? "text-red-600"
        : "text-orange-600";

  const stats = [
    {
      title: "Total Users",
      value: userStats?.totalUser || 0,
      description: getGrowthVariables(userStats?.userGrowth),
      descriptionClassName: getGrowthTextColor(userStats?.userGrowth),
    },
    {
      title: "Active Shops",
      value: shopStats?.activeShops || 0,
      description: getGrowthVariables(shopStats?.shopGrowth),
      descriptionClassName: getGrowthTextColor(shopStats?.shopGrowth),
    },
    {
      title: "Order (Last 30 Days)",
      value: orderStats?.ordersLast30 || 0,
      description: getGrowthVariables(orderStats?.orderGrowth ?? 0),
      descriptionClassName: getGrowthTextColor(orderStats?.orderGrowth),
    },
    {
      title: "Revenue (Last 30 Days)",
      value: `$${(revenueStats?.revenueLast30 || 0).toLocaleString()}`,
      description: getGrowthVariables(revenueStats?.changePercent),
      descriptionClassName: getGrowthTextColor(revenueStats?.changePercent),
    },
  ];

  const icons = [
    DollarSign,
    Users,
    Store,
    ShoppingCart,
    CreditCard,
    PieChart,
    MessageSquare,
    BarChart3,
  ];

  return (
    <div className="  flex-1 space-y-4 p-2 text-slate-700 mb-10">
      {/* Header */}
      <div className="flex items-center justify-between  space-y-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Platform Overview
          </h2>
          <p className="text-muted-foreground text-sm">
            Complete analytics and insights across your entire marketplace
          </p>
        </div>
      </div>

      {/*  Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.slice(0, 4).map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={icons[index]}
            description={stat.description}
            descriptionClassName={stat.descriptionClassName}
          />
        ))}
      </div>

      {/* Admin-Specific Charts */}
      <SalesTrend />

      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 lg:h-[740px] h-auto">
        {/* Platform Revenue vs Orders */}

        <div className="flex flex-col gap-3">
          {/* User Growth Analytics */}

          <UserGrowth />
          {/* Category Distribution */}
          <div className="bg-white    border border-dashed border-slate-300  rounded-none p-6 h-[364px] ">
            <h3 className="font-semibold text-lg mb-4">
              Product Category Distribution
            </h3>
            <CategoryDistribution />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* <div className="flex md:flex-col flex-row md:justify-between justify-start pb-3 md:pb-0 gap-3"> */}
          {/* Shop Performance Comparison */}
          <div className="bg-white border border-dashed border-slate-300 rounded-none p-6 h-[490px] flex flex-col">
            <h3 className="font-semibold text-lg mb-4">
              Top 5 Shops Performance Comparison
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <ShopPerformance />
            </div>
          </div>
          <div className="sm:h-[250px] h-auto">
            <PlatformInsights />
          </div>
        </div>
      </div>

      {/* Platform Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        {/* Recent Platform Orders */}
        <div className="bg-white border border-dashed border-slate-300 rounded-none p-6 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">
              Recent Orders
              <span className="text-xs font-normal"> (Last 15 days)</span>
            </h3>
            {currentUser?.role === "ADMIN" && (
              <Link
                href="/admin/orders"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            )}
          </div>
          <RecentOrders />
        </div>
        <div className="bg-white border border-dashed border-slate-300  rounded-none p-6 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">
              Recent Reviews{" "}
              <span className="text-xs font-normal"> (Last 30 days)</span>
            </h3>
            {currentUser?.role === "ADMIN" && (
              <Link
                href="/admin/customerFeedback"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            )}
          </div>
          <RecentReviews />
        </div>
      </div>

      {/* Quick Platform Management */}
      <QuickLinks />
    </div>
  );
};

export default AdminDashboard;
