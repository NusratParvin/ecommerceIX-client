import { Product, TOrder } from "@/types";
import { calculateMonthlyRevenueGrowth } from "@/lib/calculateMonthlyRevenueGrowth";

export interface StatData {
  title: string;
  value: string;
  description: string;
  descriptionClassName: string;
}
export const vendorDashboardStats = (
  orders: TOrder[] = [],
  products: Product[] = []
): StatData[] => {
  // Calculate total sales
  const totalSales =
    orders?.reduce((acc: number, o: TOrder) => {
      return acc + o.totalPrice;
    }, 0) || 0;

  // Calculate growth percentage (just the number)
  const growthPercentage =
    orders && orders.length > 0 ? calculateMonthlyRevenueGrowth(orders) : 0;

  // Format the growth description
  const growthDescription =
    growthPercentage > 0
      ? `+${growthPercentage}% from last month`
      : growthPercentage < 0
      ? `${growthPercentage}% from last month`
      : "No change from last month";

  // Calculate pending orders
  const pendingOrders =
    orders?.filter((o: TOrder) => o.paymentStatus !== "PAID") || [];
  const pendingOrdersCount = pendingOrders.length;

  // Calculate low stock products
  const lowStockProducts =
    products?.filter((p: Product) => p?.stock <= 5) || [];
  const lowStockCount = lowStockProducts.length;

  // Calculate average rating
  const ratedProducts = products?.filter((p: Product) => p?.rating > 0) || [];
  const reviewsCount = ratedProducts.reduce(
    (sum: number, p: Product) => sum + (p?.reviews?.length || 0),
    0
  );

  const avgRating =
    ratedProducts.length > 0
      ? ratedProducts.reduce((sum: number, p: Product) => sum + p?.rating, 0) /
        ratedProducts.length
      : 0;

  // Color logic
  const getGrowthColor = (percentage: number) => {
    if (percentage > 0) return "text-green-600";
    if (percentage < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  const getPendingOrdersColor = (count: number) => {
    if (count === 0) return "text-green-600";
    if (count <= 3) return "text-amber-600";
    return "text-red-600";
  };

  const getLowStockColor = (count: number) => {
    if (count === 0) return "text-green-600";
    if (count <= 2) return "text-amber-600";
    return "text-red-600";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-amber-600";
    return "text-red-600";
  };

  return [
    {
      title: "Total Sales",
      value: `$${totalSales.toLocaleString()}`,
      description: growthDescription,
      descriptionClassName: getGrowthColor(growthPercentage),
    },
    {
      title: "Total Orders",
      value: orders?.length?.toString() || "0",
      description: `${pendingOrdersCount} pending orders`,
      descriptionClassName: getPendingOrdersColor(pendingOrdersCount),
    },
    {
      title: "Products",
      value: products?.length?.toString() || "0",
      description: `${lowStockCount} low in stock`,
      descriptionClassName: getLowStockColor(lowStockCount),
    },
    {
      title: "Avg Rating",
      value: avgRating.toFixed(2),
      description: `From ${reviewsCount} reviews`,
      descriptionClassName: getRatingColor(avgRating),
    },
  ];
};
