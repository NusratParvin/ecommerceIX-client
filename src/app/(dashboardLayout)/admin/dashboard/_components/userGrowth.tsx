/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAdminDashboardUserGrowthChartInfoQuery } from "@/redux/features/analytics/analyticsApi";
import { UserGrowthChart } from "./charts/userGrowthChart";
import ChartSkeleton from "./charts/chartSkeleton";
import ErrorComponent from "@/components/ui/error";

const currentYear = new Date().getFullYear();
const years: number[] = [];
for (let i = 0; i < 3; i++) {
  years.push(currentYear - i);
}

export const UserGrowth = () => {
  const [selectedYear, setSelectedYear] = useState<string>(String(currentYear));

  const {
    data: userGrowthData,
    isLoading,
    isFetching,
    error,
  } = useGetAdminDashboardUserGrowthChartInfoQuery(selectedYear);

  const userGrowth = userGrowthData?.data;

  return (
    <div className="bg-white    border border-dashed border-slate-300  rounded-none p-6 h-[364px] ">
      <div className="flex md:flex-row flex-col md:justify-between justify-start pb-3 md:pb-0">
        <h3 className="font-semibold text-lg mb-4">User Growth</h3>{" "}
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px]  focus:ring-0 h-7 text-xs ">
            <SelectValue
              placeholder="Select year"
              className="text-slate-300 text-xs"
            />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={String(year)} className="text-xs">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-[270px]">
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
          <UserGrowthChart data={userGrowth} />
        )}
      </div>
    </div>
  );
};
