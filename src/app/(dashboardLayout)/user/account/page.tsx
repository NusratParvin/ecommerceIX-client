"use client";
import { useEffect, useState } from "react";
import { UserOrders } from "./_components/userOrders";
import { FollowedShops } from "./_components/followedShops";
import { RecentlyViewedProducts } from "./_components/recentlyViewedProducts";
import { UserStats } from "./_components/userStats";

// --- Simulated data fetching functions (kept as-is) ---
const fetchUserStats = async () => ({
  totalOrders: 15,
  totalSpent: 2500.0,
  activeOrders: 2,
  savedItems: 8,
});

const fetchRecentlyViewed = async () => [
  {
    id: "1",
    name: "Wireless Earbuds",
    price: 99.99,
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
    shop: "Tech Haven",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    shop: "Gadget World",
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    shop: "Office Essentials",
  },
];

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
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [followedShops, setFollowedShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsRes, recentlyViewedRes, recentOrdersRes, followedShopsRes] =
          await Promise.all([
            fetchUserStats(),
            fetchRecentlyViewed(),
            fetchRecentOrders(),
            fetchFollowedShops(),
          ]);

        if (!cancelled) {
          setStats(statsRes);
          setRecentlyViewed(recentlyViewedRes);
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
        <RecentlyViewedProducts
        // products={recentlyViewed || []}
        // className="lg:col-span-4"
        />
        <FollowedShops shops={followedShops || []} className="lg:col-span-3" />
      </div>

      <UserOrders orders={recentOrders || []} />
    </div>
  );
};

export default UserDashboard;
