/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ChartSkeleton from "./charts/chartSkeleton";
import ErrorComponent from "@/components/ui/error";
import { useGetAdminDashboardCategoryDistributionChartInfoQuery } from "@/redux/features/analytics/analyticsApi";
import { CategoryDistributionChart } from "./charts/categoryDistributionChart";
const emptyChartData = {
  labels: [],
  datasets: [],
};

const CategoryDistribution = () => {
  const {
    data: categoryDistributionData,
    isLoading,
    error,
  } = useGetAdminDashboardCategoryDistributionChartInfoQuery(undefined);

  const categoryDistribution = categoryDistributionData?.data || emptyChartData;
  //   console.log(categoryDistribution);

  return (
    <div className="w-full h-72">
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
        <CategoryDistributionChart data={categoryDistribution} />
      )}
    </div>
  );
};

export default CategoryDistribution;
