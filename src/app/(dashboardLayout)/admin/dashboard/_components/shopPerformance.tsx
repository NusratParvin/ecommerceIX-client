import { useGetAdminDashboardShopPerformanceChartInfoQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import { ShopPerformanceChart } from "./charts/shopPerformanceChart";

const ShopPerformance = () => {
  const {
    data: shopPerformanceData,
    isLoading,
    error,
  } = useGetAdminDashboardShopPerformanceChartInfoQuery(undefined);

  const shopPerformance = shopPerformanceData || [];
  console.log(shopPerformance);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center h-full bg-gray-50 rounded border">
        <p className="text-muted-foreground">Shop Performance Comparison</p>
      </div>
      <ShopPerformanceChart data={shopPerformance} />
    </div>
  );
};

export default ShopPerformance;
