// "use client";

// import { ShoppingCart, DollarSign, Package, Star } from "lucide-react";
// // import { Icon } from "@iconify/react";

// import { StatCard } from "../../admin/dashboard/_components/statCards";
// import { VendorRevenueChart } from "./_components/vendorRevenueChart";
// import { TopProducts } from "./_components/topProducts";
// import { RecentVendorOrders } from "./_components/recentVendorOrders";
// import { useGetOrdersByShopQuery } from "@/redux/features/orders/ordersApi";
// import { Product, TOrder } from "@/types";
// import { useGetProductsForVendorQuery } from "@/redux/features/products/productsApi";
// import { calculateMonthlyRevenueGrowth } from "@/lib/calculateMonthlyRevenueGrowth";

// const VendorDashboard = () => {
//   const { data: ordersData } = useGetOrdersByShopQuery({});

//   const orders = ordersData?.data;

//   const { data: productsData } = useGetProductsForVendorQuery({});
//   const products = productsData?.data;
//   const lowStockProducts = products?.filter((p: Product) => p?.stock <= 5);

//   const ratedProducts = products?.filter((p: Product) => p?.rating > 0);

//   const reviewsCount = ratedProducts?.length
//     ? ratedProducts?.reduce(
//         (sum: number, p: Product) => sum + p?.reviews?.length,
//         0
//       )
//     : 0;

//   const avgRating =
//     ratedProducts?.length > 0
//       ? ratedProducts?.reduce((sum: number, p: Product) => sum + p?.rating, 0) /
//         ratedProducts?.length
//       : 0;

//   const totalSales = orders?.reduce((acc: number, o: TOrder) => {
//     return acc + o.totalPrice;
//   }, 0);
//   const pendingOrders = orders?.filter(
//     (o: TOrder) => o.paymentStatus !== "PAID"
//   );

//   const growthData =
//     orders && orders.length > 0
//       ? calculateMonthlyRevenueGrowth(orders)
//       : { growthDescription: "+0% from last month" }; // console.log(orders);

//   return (
//     <div
//       className="flex-1 space-y-4 p-2 text-slate-700
//     mb-10"
//     >
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-2xl font-semibold tracking-tight">
//           Vendor Dashboard
//         </h2>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <StatCard
//           title="Total Sales"
//           value={`$${totalSales}`}
//           icon={DollarSign}
//           description={`${growthData}% from last month`}
//         />
//         <StatCard
//           title="Total Orders"
//           value={orders?.length}
//           icon={ShoppingCart}
//           description={`${pendingOrders?.length} pending orders`}
//         />
//         <StatCard
//           title="Products"
//           value={products?.length}
//           icon={Package}
//           // description="3 low in stock"
//           description={`${lowStockProducts?.length} low in stock`}
//         />
//         <StatCard
//           title="Avg Rating"
//           value={avgRating?.toFixed(2)}
//           icon={Star}
//           description={` From ${reviewsCount} reviews`}
//         />
//         {/* <StatCard
//           title="Total Sales"
//           value="$12,345"
//           icon={
//             <Icon
//               icon="flat-color-icons:shop"
//               className="h-14 w-14 text-deep-brown/80"
//             />
//           }
//           description="+15% from last month"
//         />
//         <StatCard
//           title="Active Orders"
//           value="25"
//           icon={
//             <Icon
//               icon="flat-color-icons:clock"
//               className="h-14 w-14 text-deep-brown/80"
//             />
//           }
//           description="5 pending shipment"
//         />
//         <StatCard
//           title="Products"
//           value="48"
//           icon={
//             <Icon
//               icon="flat-color-icons:package"
//               className="h-14 w-14 text-deep-brown/80"
//             />
//           }
//           description="3 low in stock"
//         />
//         <StatCard
//           title="Avg Rating"
//           value="4.8"
//           icon={
//             <Icon
//               icon="flat-color-icons:star"
//               className="h-14 w-14 text-deep-brown/80"
//             />
//           }
//           description="From 235 reviews"
//         /> */}
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <VendorRevenueChart />
//         <TopProducts />
//       </div>
//       <RecentVendorOrders />
//     </div>
//   );
// };

// export default VendorDashboard;
"use client";

import { ShoppingCart, DollarSign, Package, Star } from "lucide-react";
import { StatCard } from "../../admin/dashboard/_components/statCards";
import { VendorRevenueChart } from "./_components/vendorRevenueChart";
import { TopProducts } from "./_components/topProducts";
import { RecentVendorOrders } from "./_components/recentVendorOrders";
import { useGetOrdersByShopQuery } from "@/redux/features/orders/ordersApi";
import { useGetProductsForVendorQuery } from "@/redux/features/products/productsApi";
import { vendorDashboardStats } from "./_components/vendorDashboardStats";
import moment from "moment";

const VendorDashboard = () => {
  const { data: ordersData } = useGetOrdersByShopQuery({});
  const { data: productsData } = useGetProductsForVendorQuery({});

  const orders = ordersData?.data || [];
  const products = productsData?.data || [];
  const sortedOrders = orders
    ? [...orders].sort(
        (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
      )
    : [];
  // Get all stats from helper function
  const stats = vendorDashboardStats(orders, products);

  // Map icons to stats
  const icons = [DollarSign, ShoppingCart, Package, Star];

  return (
    <div className="flex-1 space-y-4 p-2 text-slate-700 mb-10">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Vendor Dashboard
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <VendorRevenueChart />
        <TopProducts />
      </div>

      <RecentVendorOrders recentOrders={sortedOrders} />
    </div>
  );
};

export default VendorDashboard;
