"use client";
import {
  DollarSign,
  Users,
  ShoppingCart,
  Store,
  Ticket,
  MessageSquare,
  CreditCard,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useGetUsersQuery } from "@/redux/features/users/usersApi";
import { RecentOrders } from "./_components/recentOrders";
import { StatCard } from "./_components/statCards";
import UserGrowthChart from "./_components/charts/userGrowthChart";
// import {
//   processUserRegistrationData,
//   processUserRoleData,
//   processUserStatusData,
// } from "@/lib/adminChartDataHelpers";
import { useGetAdminDashboardAnalyticsInfoQuery } from "@/redux/features/analytics/analyticsApi";
import { SalesTrend } from "./_components/salesTrend";
import ShopPerformance from "./_components/shopPerformance";
import CategoryDistribution from "./_components/categoryDistribution";
import PlatformInsights from "./_components/platformInsights";
import { RecentReviews } from "./_components/recentReiews";

const AdminDashboard = () => {
  const { data: usersData } = useGetUsersQuery({});
  const { data: adminAnalyticsData } = useGetAdminDashboardAnalyticsInfoQuery(
    {},
  );

  const users = usersData?.data || [];
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

      <div className="grid gap-3 md:grid-cols-2 h-[740px]">
        {/* Platform Revenue vs Orders */}

        <div className="flex flex-col gap-3">
          {/* User Growth Analytics */}
          <div className="bg-white    border border-dashed border-slate-300  rounded-none p-6 h-[364px] ">
            <h3 className="font-semibold text-lg mb-4">User Growth</h3>
            <UserGrowthChart users={users} />
          </div>{" "}
          {/* Category Distribution */}
          <div className="bg-white    border border-dashed border-slate-300  rounded-none p-6 h-[364px] ">
            <h3 className="font-semibold text-lg mb-4">
              Product Category Distribution
            </h3>
            <CategoryDistribution />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* Shop Performance Comparison */}
          <div className="bg-white border border-dashed border-slate-300 rounded-none p-6 h-[490px] flex flex-col">
            <h3 className="font-semibold text-lg mb-4">
              Top 5 Shops Performance Comparison
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <ShopPerformance />
            </div>
          </div>
          <div className="h-[250px]">
            <PlatformInsights />
          </div>
        </div>
      </div>

      {/* Platform Activity Section */}
      <div className="grid grid-cols-5 gap-3 items-start">
        {/* Recent Platform Orders */}
        <div className="bg-white border border-dashed border-slate-300 rounded-none p-6 col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Recent Platform Orders</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All Orders
            </button>
          </div>
          <RecentOrders />
        </div>
        <div className="bg-white border border-dashed border-slate-300  rounded-none p-6 col-span-2">
          <RecentReviews />
        </div>
      </div>

      {/* Quick Platform Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 cursor-pointer transition-colors">
          <Store className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-blue-800">Manage Shops</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 cursor-pointer transition-colors">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-green-800">
            User Management
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 cursor-pointer transition-colors">
          <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-purple-800">Analytics</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center hover:bg-orange-100 cursor-pointer transition-colors">
          <Ticket className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-orange-800">Coupons</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
