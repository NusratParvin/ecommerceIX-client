// import { useQuery } from "@tanstack/react-query";
// import { UserOrders } from "./_components/userOrders";
// import { FollowedShops } from "./_components/followedShops";
// import { RecentlyViewedProducts } from "./_components/recentlyViewedProducts";
// import { UserStats } from "./_components/userStats";

// Simulated data fetching functions
// const fetchUserStats = async () => ({
//   totalOrders: 15,
//   totalSpent: 2500.0,
//   activeOrders: 2,
//   savedItems: 8,
// });

// const fetchRecentlyViewed = async () => [
//   {
//     id: "1",
//     name: "Wireless Earbuds",
//     price: 99.99,
//     imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
//     shop: "Tech Haven",
//   },
//   {
//     id: "2",
//     name: "Smart Watch",
//     price: 199.99,
//     imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
//     shop: "Gadget World",
//   },
//   {
//     id: "3",
//     name: "Laptop Stand",
//     price: 49.99,
//     imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
//     shop: "Office Essentials",
//   },
// ];

// const fetchRecentOrders = async () => [
//   { id: "1", date: "2024-02-20", status: "Delivered", total: 299.99 },
//   { id: "2", date: "2024-02-15", status: "In Transit", total: 149.99 },
//   { id: "3", date: "2024-02-10", status: "Processing", total: 89.99 },
// ];

// const fetchFollowedShops = async () => [
//   { id: "1", name: "Tech Haven", productCount: 150, followers: 1200 },
//   { id: "2", name: "Fashion Plus", productCount: 300, followers: 2500 },
//   { id: "3", name: "Home Decor", productCount: 200, followers: 1800 },
// ];

const UserDashboard = () => {
  //   const { data: stats } = useQuery({
  //     queryKey: ["userStats"],
  //     queryFn: fetchUserStats,
  //   });

  //   const { data: recentlyViewed } = useQuery({
  //     queryKey: ["recentlyViewed"],
  //     queryFn: fetchRecentlyViewed,
  //   });

  //   const { data: recentOrders } = useQuery({
  //     queryKey: ["recentOrders"],
  //     queryFn: fetchRecentOrders,
  //   });

  //   const { data: followedShops } = useQuery({
  //     queryKey: ["followedShops"],
  //     queryFn: fetchFollowedShops,
  //   });

  return (
    // <div className="flex-1 space-y-4 p-8 pt-6">
    //   <div className="flex items-center justify-between space-y-2">
    //     <h2 className="text-3xl font-bold tracking-tight">My Dashboard</h2>
    //   </div>
    //   <UserStats stats={stats} />
    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    //     <RecentlyViewedProducts
    //       products={recentlyViewed}
    //       className="lg:col-span-4"
    //     />
    //     <FollowedShops shops={followedShops} className="lg:col-span-3" />
    //   </div>
    //   <UserOrders orders={recentOrders} />
    // </div>
    <div className="flex justify-center items-center min-h-screen">
      Under maintenance
    </div>
  );
};

export default UserDashboard;
