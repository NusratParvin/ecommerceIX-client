"use client";
import { UserOrders } from "./_components/userOrders";
import { FollowedShops } from "./_components/followedShops";
import { RecentlyViewedProducts } from "./_components/recentlyViewedProducts";
import { UserStats } from "./_components/userStats";
import { useGetUserOrdersQuery } from "@/redux/features/orders/ordersApi";
import { TOrder } from "@/types";

const UserDashboard = () => {
  const {
    data,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetUserOrdersQuery({});

  const orders = data?.data || [];

  const activeOrders = orders.filter((o: TOrder) => o.paymentStatus !== "PAID");

  const totalSpent = orders.reduce(
    (acc: number, order: TOrder) =>
      acc + (order.paymentStatus === "PAID" ? order.totalPrice : 0),
    0
  );
  // console.log(totalSpent);
  const userStats = {
    totalOrders: data?.meta?.total || 0,
    totalSpent,
    activeOrders: activeOrders.length,
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       Loading dashboard…
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="text-red-600">Error: {error}</div>
  //     </div>
  //   );
  // }

  return (
    <div
      className="flex-1 space-y-4 p-2 text-slate-700
    mb-10"
    >
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">My Dashboard</h2>
      </div>

      <UserStats
        stats={
          userStats || {
            totalOrders: 0,
            totalSpent: 0,
            activeOrders: 0,
          }
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentlyViewedProducts />
        <FollowedShops />
      </div>

      <UserOrders
        orders={orders || []}
        isOrdersLoading={isOrdersLoading}
        isOrdersError={isOrdersError}
      />
    </div>
  );
};

export default UserDashboard;
