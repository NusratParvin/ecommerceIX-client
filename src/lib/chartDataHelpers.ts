import moment from "moment";
import { TOrder, Product } from "@/types";

// Revenue Trends Data
export const getRevenueTrendsData = (orders: TOrder[]) => {
  const monthlyRevenue: { [key: string]: number } = {};

  orders.forEach((order) => {
    const month = moment(order.createdAt).format("MMM YYYY");
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.totalPrice;
  });

  const sortedMonths = Object.keys(monthlyRevenue).sort(
    (a, b) => moment(a, "MMM YYYY").valueOf() - moment(b, "MMM YYYY").valueOf()
  );

  return {
    labels: sortedMonths,
    data: sortedMonths.map((month) => monthlyRevenue[month]),
  };
};

// Top Products Data
export const getTopProductsData = (products: Product[]) => {
  const productsWithRevenue = products
    .filter((product) => product.OrderItem && product.OrderItem.length > 0)
    .map((product) => {
      const revenue = product.OrderItem!.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return {
        name: product.name,
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    labels: productsWithRevenue.map((p) => p.name),
    data: productsWithRevenue.map((p) => p.revenue),
  };
};

// Order Status Data
export const getOrderStatusData = (orders: TOrder[]) => {
  const statusCount: { [key: string]: number } = {};

  orders.forEach((order) => {
    statusCount[order.paymentStatus] =
      (statusCount[order.paymentStatus] || 0) + 1;
  });

  return {
    labels: Object.keys(statusCount),
    data: Object.values(statusCount),
  };
};

// Category Performance Data
export const getCategoryPerformanceData = (products: Product[]) => {
  const categoryRevenue: { [key: string]: number } = {};

  products.forEach((product) => {
    if (product.OrderItem && product.OrderItem.length > 0) {
      const revenue = product.OrderItem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const categoryName = product.category?.name || "Uncategorized";
      categoryRevenue[categoryName] =
        (categoryRevenue[categoryName] || 0) + revenue;
    }
  });

  return {
    labels: Object.keys(categoryRevenue),
    data: Object.values(categoryRevenue),
  };
};
