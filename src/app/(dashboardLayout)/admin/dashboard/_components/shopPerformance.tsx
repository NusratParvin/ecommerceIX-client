/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAdminDashboardShopPerformanceChartInfoQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import { ShopPerformanceChart } from "./charts/shopPerformanceChart";
import ChartSkeleton from "./charts/chartSkeleton";
import ErrorComponent from "@/components/ui/error";
const emptyChartData = {
  labels: [],
  datasets: [],
};

const ShopPerformance = () => {
  const {
    data: shopPerformanceData,
    isLoading,
    error,
  } = useGetAdminDashboardShopPerformanceChartInfoQuery(undefined);

  const shopPerformance = shopPerformanceData?.data || emptyChartData;
  // console.log(shopPerformance);

  return (
    // <div className="w-full h-full  ">
    <div className="w-full h-full flex items-center justify-center">
      {isLoading ? (
        <ChartSkeleton />
      ) : error ? (
        <ErrorComponent
          message={
            (error as any)?.status === "FETCH_ERROR"
              ? "Network error. Please check your connection."
              : "Failed to load sales data. Please try again."
          }
        />
      ) : (
        <div className="w-full h-full max-w-[400px] max-h-[400px]">
          <ShopPerformanceChart data={shopPerformance} />
        </div>
      )}
    </div>
  );
};

export default ShopPerformance;
