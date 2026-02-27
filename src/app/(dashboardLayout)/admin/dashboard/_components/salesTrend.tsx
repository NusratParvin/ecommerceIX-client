/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SelectSalesTrend from "./charts/_components/selectSalesTrend";
import SalesTrendChart from "./charts/salesTrendChart";
import { useGetAdminDashboardSalesTrendChartInfoQuery } from "@/redux/features/analytics/analyticsApi";
import ChartSkeleton from "./charts/chartSkeleton";
import ErrorComponent from "@/components/ui/error";

export interface FilterProps {
  month?: string;
  year?: string;
}
export const SalesTrend = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterProps>({});

  const {
    data: salesTrendChartData,
    isLoading,
    isFetching,
    error,
  } = useGetAdminDashboardSalesTrendChartInfoQuery(selectedFilters);

  const salesTrend = salesTrendChartData?.data || [];

  return (
    // <div className="bg-white border border-gray-200 rounded-none p-6">
    <div className="bg-white    border border-dashed border-slate-300  rounded-none p-6">
      <div className="flex md:flex-row flex-col md:justify-between justify-start pb-3 md:pb-0">
        <h3 className="font-semibold text-lg mb-4">Sales Trend</h3>
        <SelectSalesTrend setFilters={setSelectedFilters} />
      </div>
      <div className="w-full h-72 my-2">
        {isLoading || isFetching ? (
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
          <SalesTrendChart sales={salesTrend} />
        )}
      </div>
    </div>
  );
};
