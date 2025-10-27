// "use client";
// import { Users, DollarSign, ShoppingCart, Store } from "lucide-react";
// // import { RevenueChart } from "./_components/revenueChart";
// import { RecentOrders } from "./_components/recentOrders";
// import { StatCard } from "./_components/statCards";

// const Index = () => {
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

// export default Index;

"use client";
import { Upload, Users, DollarSign, TrendingUp } from "lucide-react";
import { RecentOrders } from "./_components/recentOrders";
import { StatCard } from "./_components/statCards";

const Index = () => {
  return (
    <div className="flex-1 space-y-4 p-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats Grid - Match image layout */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Today's Upload" value="21" icon={Upload} />
        <StatCard title="New Users" value="53" icon={Users} />
        <StatCard title="Total Sales" value="4031" icon={DollarSign} />
        <StatCard title="Sales" value="80" icon={TrendingUp} />
      </div>

      {/* Chart and Table Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sales Chart */}
        <div className="bg-white p-4 border border-gray-200">
          <h3 className="font-semibold mb-4">Sales</h3>
          <div className="flex items-end justify-between h-32 mb-4">
            <div className="flex flex-col items-center">
              <div
                className="w-4 bg-blue-500 mb-1"
                style={{ height: "80px" }}
              ></div>
              <span className="text-xs">80</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-4 bg-blue-500 mb-1"
                style={{ height: "90px" }}
              ></div>
              <span className="text-xs">90</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-4 bg-blue-500 mb-1"
                style={{ height: "80px" }}
              ></div>
              <span className="text-xs">80</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-4 bg-blue-500 mb-1"
                style={{ height: "40px" }}
              ></div>
              <span className="text-xs">40</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-4 bg-blue-500 mb-1"
                style={{ height: "20px" }}
              ></div>
              <span className="text-xs">20</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-4 bg-blue-500 mb-1"
                style={{ height: "30px" }}
              ></div>
              <span className="text-xs">30</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-4 bg-blue-500 mb-1"
                style={{ height: "40px" }}
              ></div>
              <span className="text-xs">40</span>
            </div>
          </div>
          <div className="flex justify-center gap-8 text-lg font-bold">
            <span>4031</span>
            <span>4031</span>
            <span>4031</span>
          </div>
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </div>
  );
};

export default Index;
