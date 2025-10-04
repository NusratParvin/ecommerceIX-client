"use client";
import { useEffect, useState } from "react";
import { UserOrders } from "./_components/userOrders";
import { FollowedShops } from "./_components/followedShops";
import { RecentlyViewedProducts } from "./_components/recentlyViewedProducts";
import { UserStats } from "./_components/userStats";
import { useGetUserOrdersQuery } from "@/redux/features/orders/ordersApi";

// --- Simulated data fetching functions (kept as-is) ---

const fetchRecentOrders = async () => [
  { id: "1", date: "2024-02-20", status: "Delivered", total: 299.99 },
  { id: "2", date: "2024-02-15", status: "In Transit", total: 149.99 },
  { id: "3", date: "2024-02-10", status: "Processing", total: 89.99 },
];

const fetchFollowedShops = async () => [
  { id: "1", name: "Tech Haven", productCount: 150, followers: 1200 },
  { id: "2", name: "Fashion Plus", productCount: 300, followers: 2500 },
  { id: "3", name: "Home Decor", productCount: 200, followers: 1800 },
];

// --- Dashboard without TanStack Query ---
const UserDashboard = () => {
  const [stats, setStats] = useState<any | null>(null);
  // const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [followedShops, setFollowedShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading, isError } = useGetUserOrdersQuery({
    // userId: "user-id-from-auth-context-or-param",
    page,
    limit,
    searchTerm,
    sortBy,
    sortOrder,
  });
  console.log(data?.data);
  const orders = data?.data || [];
  // const totalOrders = data?.meta?.total || 0;

  const activeOrders = orders.filter((o) => o.paymentStatus !== "PAID");

  const totalSpent = orders.reduce(
    (acc, order) =>
      acc + (order.paymentStatus === "PAID" ? order.totalPrice : 0),
    0
  );
  console.log(totalSpent);
  const fetchUserStats = async () => ({
    totalOrders: data?.meta?.total || 0,
    totalSpent,
    activeOrders,
    // savedItems: 8,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsRes, recentOrdersRes, followedShopsRes] = await Promise.all(
          [
            fetchUserStats(),
            // fetchRecentlyViewed(),
            fetchRecentOrders(),
            fetchFollowedShops(),
          ]
        );

        if (!cancelled) {
          setStats(statsRes);
          // setRecentlyViewed(recentlyViewedRes);
          setRecentOrders(recentOrdersRes);
          setFollowedShops(followedShopsRes);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 space-y-4 p-2 text-slate-700
    mb-10"
    >
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">My Dashboard</h2>
      </div>

      {/* Pass null-safe data */}
      <UserStats
        stats={
          stats || {
            totalOrders: 0,
            totalSpent: 0,
            activeOrders: 0,
            // savedItems: 0,
          }
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentlyViewedProducts />
        <FollowedShops />
      </div>

      <UserOrders orders={orders || []} />
    </div>
  );
};

export default UserDashboard;
