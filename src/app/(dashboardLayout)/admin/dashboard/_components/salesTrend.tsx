import React, { useState } from "react";
import SelectSalesTrend from "./charts/_components/selectSalesTrend";
import SalesTrendChart from "./charts/salesTrendChart";
import { useGetAdminDashboardSalesTrendChartInfoQuery } from "@/redux/features/analytics/analyticsApi";

export interface FilterProps {
  month?: string;
  year?: string;
}
export const SalesTrend = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterProps>({});

  const {
    data: salesTrendChartData,
    isLoading,
    error,
  } = useGetAdminDashboardSalesTrendChartInfoQuery(selectedFilters);

  //   const handleFilterChange = (month: string, year: string) => {
  //     setSelectedFilters({ month, year });
  //   };
  const salesTrend = salesTrendChartData?.data || [];
  console.log(selectedFilters, salesTrend);
  return (
    <div>
      <div className="flex justify-end">
        <SelectSalesTrend setFilters={setSelectedFilters} />
      </div>
      <div className="w-full h-72">
        <SalesTrendChart sales={salesTrend} />
      </div>
    </div>
  );
};
