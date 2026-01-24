// "use client";
// import { Users, DollarSign, ShoppingCart, Store } from "lucide-react";
// // import { RevenueChart } from "./_components/revenueChart";
// import { RecentOrders } from "./_components/recentOrders";
// import { StatCard } from "./_components/statCards";

// const AdminDashboard = () => {
//   return (
//     <div className="flex-1 space-y-4 p-0 ">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title="Total Revenue"
//           value="$45,231.89"
//           icon={DollarSign}
//           description="+20.1% from last month"
//         />
//         <StatCard
//           title="Total Users"
//           value="2,350"
//           icon={Users}
//           description="+180 new users"
//         />
//         <StatCard
//           title="Active Orders"
//           value="12"
//           icon={ShoppingCart}
//           description="3 pending approval"
//         />
//         <StatCard
//           title="Active Shops"
//           value="48"
//           icon={Store}
//           description="+2 this week"
//         />
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
//         {/* <RevenueChart /> */}
//         <RecentOrders />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// "use client";
// import { Upload, Users, DollarSign, TrendingUp } from "lucide-react";
// import { RecentOrders } from "./_components/recentOrders";
// import { StatCard } from "./_components/statCards";

// const AdminDashboard = () => {
//   return (
//     <div className="flex-1 space-y-4 p-0">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
//       </div>

//       {/* Stats Grid - Match image layout */}
//       <div className="grid grid-cols-4 gap-4">
//         <StatCard title="Today's Upload" value="21" icon={Upload} />
//         <StatCard title="New Users" value="53" icon={Users} />
//         <StatCard title="Total Sales" value="4031" icon={DollarSign} />
//         <StatCard title="Sales" value="80" icon={TrendingUp} />
//       </div>

//       {/* Chart and Table Section */}
//       <div className="grid grid-cols-2 gap-4">
//         {/* Sales Chart */}
//         <div className="bg-white p-4 border border-gray-200">
//           <h3 className="font-semibold mb-4">Sales</h3>
//           <div className="flex items-end justify-between h-32 mb-4">
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-4 bg-blue-500 mb-1"
//                 style={{ height: "80px" }}
//               ></div>
//               <span className="text-xs">80</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-4 bg-blue-500 mb-1"
//                 style={{ height: "90px" }}
//               ></div>
//               <span className="text-xs">90</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-4 bg-blue-500 mb-1"
//                 style={{ height: "80px" }}
//               ></div>
//               <span className="text-xs">80</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-4 bg-blue-500 mb-1"
//                 style={{ height: "40px" }}
//               ></div>
//               <span className="text-xs">40</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-4 bg-blue-500 mb-1"
//                 style={{ height: "20px" }}
//               ></div>
//               <span className="text-xs">20</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-4 bg-blue-500 mb-1"
//                 style={{ height: "30px" }}
//               ></div>
//               <span className="text-xs">30</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="w-4 bg-blue-500 mb-1"
//                 style={{ height: "40px" }}
//               ></div>
//               <span className="text-xs">40</span>
//             </div>
//           </div>
//           <div className="flex justify-center gap-8 text-lg font-bold">
//             <span>4031</span>
//             <span>4031</span>
//             <span>4031</span>
//           </div>
//         </div>

//         {/* Recent Orders */}
//         <RecentOrders />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

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
import { useGetOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetProductsForAdminQuery } from "@/redux/features/products/productsApi";
import { useGetUsersQuery } from "@/redux/features/users/usersApi";
import { RecentOrders } from "./_components/recentOrders";
import { StatCard } from "./_components/statCards";
import UserGrowthChart from "./_components/charts/userGrowthChart";
import ShopPerformanceChart from "./_components/charts/shopPerformanceChart";
import CategoryDistributionChart from "./_components/charts/categoryDistributionChart";
import {
  processUserRegistrationData,
  processUserRoleData,
  processUserStatusData,
} from "@/lib/adminChartDataHelpers";
import { useGetAdminDashboardAnalyticsInfoQuery } from "@/redux/features/analytics/analyticsApi";
import { SalesTrend } from "./_components/salesTrend";

const AdminDashboard = () => {
  const { data: ordersData } = useGetOrdersQuery({});
  const { data: productsData } = useGetProductsForAdminQuery({});
  const { data: usersData } = useGetUsersQuery({});
  const { data: adminAnalyticsData } = useGetAdminDashboardAnalyticsInfoQuery(
    {},
  );

  const orders = ordersData?.data || [];
  const products = productsData?.data || [];
  const users = usersData?.data || [];
  const { userStats, shopStats, orderStats, revenueStats } =
    adminAnalyticsData?.data || [];

  // console.log(salesTrend);
  // console.log(userStats, shopStats, orderStats, revenueStats);

  // Process user data for polar charts
  const userRoleData = processUserRoleData(users);
  const userStatusData = processUserStatusData(users);
  const userRegistrationData = processUserRegistrationData(users);

  // Process shop data for bar chartafcg
  // const shopChartData = processShopData(orders);

  // Calculate admin-specific platform-wide stats
  const totalRevenue = orders.reduce(
    (total: number, order: any) => total + (order.totalAmount || 0),
    0,
  );
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;

  // Platform-wide metrics
  const activeShops = new Set(products.map((product: any) => product.shop?._id))
    .size;
  const pendingOrders = orders.filter(
    (order: any) => order.status === "pending",
  ).length;
  const completedOrders = orders.filter(
    (order: any) => order.status === "completed",
  ).length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

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

  const sortedOrders = orders
    ? [...orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : [];

  const recentOrders = sortedOrders.slice(0, 6);

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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform Revenue vs Orders */}

        {/* User Growth Analytics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">
            User Growth & Acquisition
          </h3>
          <UserGrowthChart users={users} height={280} />
        </div>

        {/* Shop Performance Comparison */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Top Performing Shops</h3>
          <ShopPerformanceChart
            products={products}
            orders={orders}
            height={280}
          />
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">
            Product Category Distribution
          </h3>
          <CategoryDistributionChart products={products} height={280} />
        </div>
      </div>

      {/* Platform Activity Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Platform Orders */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Recent Platform Orders</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All Orders
              </button>
            </div>
            <RecentOrders orders={recentOrders} showShop={true} />
          </div>
        </div>

        {/* Platform Insights */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Platform Insights</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Generate Report
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-medium text-blue-800">Peak Hours</p>
                <p className="text-xs text-blue-600">2:00 PM - 5:00 PM</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm font-medium text-green-800">
                  Top Category
                </p>
                <p className="text-xs text-green-600">
                  Electronics (32% of sales)
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <p className="text-sm font-medium text-purple-800">New Shops</p>
                <p className="text-xs text-purple-600">
                  3 shops joined this week
                </p>
              </div>
            </div>
          </div>
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
