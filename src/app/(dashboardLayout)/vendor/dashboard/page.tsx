"use client";

import { ShoppingCart, DollarSign, Package, Star } from "lucide-react";
// import { Icon } from "@iconify/react";

import { StatCard } from "../../admin/dashboard/_components/statCards";
import { VendorRevenueChart } from "./_components/vendorRevenueChart";
import { TopProducts } from "./_components/topProducts";
import { RecentVendorOrders } from "./_components/recentVendorOrders";
import { useGetOrdersByShopQuery } from "@/redux/features/orders/ordersApi";
import { TOrder } from "@/types";
import { useGetProductsForVendorQuery } from "@/redux/features/products/productsApi";

const VendorDashboard = () => {
  const { data: ordersData, isLoading, isError } = useGetOrdersByShopQuery({});
  // console.log(data, error);
  const orders = ordersData?.data;

  const { data: productsData } = useGetProductsForVendorQuery({});
  const totalProducts = productsData?.data;
  const totalSales = orders?.reduce((acc: number, o: TOrder) => {
    return acc + o.totalPrice;
  }, 0);
  const pendingOrders = orders?.filter(
    (o: TOrder) => o.paymentStatus !== "PAID"
  );
  console.log(orders, totalSales);
  return (
    <div
      className="flex-1 space-y-4 p-2 text-slate-700
    mb-10"
    >
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Vendor Dashboard
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value={`$${totalSales}`}
          icon={DollarSign}
          description="+15% from last month"
        />
        <StatCard
          title="Total Orders"
          value={orders?.length}
          icon={ShoppingCart}
          description={`${pendingOrders?.length} pending orders`}
        />
        <StatCard
          title="Products"
          value={totalProducts?.length}
          icon={Package}
          description="3 low in stock"
        />
        <StatCard
          title="Avg Rating"
          value="4.8"
          icon={Star}
          description="From 235 reviews"
        />
        {/* <StatCard
          title="Total Sales"
          value="$12,345"
          icon={
            <Icon
              icon="flat-color-icons:shop"
              className="h-14 w-14 text-deep-brown/80"
            />
          }
          description="+15% from last month"
        />
        <StatCard
          title="Active Orders"
          value="25"
          icon={
            <Icon
              icon="flat-color-icons:clock"
              className="h-14 w-14 text-deep-brown/80"
            />
          }
          description="5 pending shipment"
        />
        <StatCard
          title="Products"
          value="48"
          icon={
            <Icon
              icon="flat-color-icons:package"
              className="h-14 w-14 text-deep-brown/80"
            />
          }
          description="3 low in stock"
        />
        <StatCard
          title="Avg Rating"
          value="4.8"
          icon={
            <Icon
              icon="flat-color-icons:star"
              className="h-14 w-14 text-deep-brown/80"
            />
          }
          description="From 235 reviews"
        /> */}
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
