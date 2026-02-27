"use client";

import { ShoppingCart, DollarSign, Package, Star } from "lucide-react";
import { StatCard } from "../../admin/dashboard/_components/statCards";
// import { VendorRevenueChart } from "./_components/vendorRevenueChart";
import { RecentVendorOrders } from "./_components/recentVendorOrders";
import { useGetOrdersByShopQuery } from "@/redux/features/orders/ordersApi";
import { useGetProductsForVendorQuery } from "@/redux/features/products/productsApi";
import moment from "moment";
import { TrendingProducts } from "./_components/trendingProducts";
import { RevenueTrendsChart } from "./_components/charts/revenueTrendsChart";
import { TopProductsChart } from "./_components/charts/topProductsChart";
import { OrderStatusChart } from "./_components/charts/orderStatusChart";
import { CategoryPerformanceChart } from "./_components/charts/categoryPerformanceChart";
import { vendorDashboardStats } from "@/lib/vendorDashboardStats";

const VendorDashboard = () => {
  const { data: ordersData } = useGetOrdersByShopQuery({});
  const { data: productsData } = useGetProductsForVendorQuery({});

  const orders = ordersData?.data || [];
  const products = productsData?.data || [];
  const sortedOrders = orders
    ? [...orders].sort(
        (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
      )
    : [];
  // Get all stats from helper function
  const stats = vendorDashboardStats(orders, products);

  // Map icons to stats
  const icons = [DollarSign, ShoppingCart, Package, Star];
  // console.log(orders, products);
  return (
    <div className="flex-1 space-y-4 p-2 text-slate-700 mb-10">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Vendor Dashboard
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-3 md:grid-cols-2">
        <div className="bg-white border border-dashed border-slate-300 rounded-none shadow-none h-80 p-4">
          <RevenueTrendsChart orders={orders} />
        </div>
        <div className="bg-white border border-dashed border-slate-300 rounded-none shadow-none h-80 p-4">
          <TopProductsChart products={products} />
        </div>
        <div className="bg-white border border-dashed border-slate-300 rounded-none shadow-none h-80 p-4">
          <OrderStatusChart orders={orders} />
        </div>
        <div className="bg-white border border-dashed border-slate-300 rounded-none shadow-none h-80 p-4 ">
          <CategoryPerformanceChart products={products} />
        </div>
      </div>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {/* <VendorRevenueChart products={products} /> */}
        <RecentVendorOrders recentOrders={sortedOrders} />
        <TrendingProducts products={products} />
      </div>
    </div>
  );
};

export default VendorDashboard;
