import { useGetAdminDashboardPlatformInsightsInfoQuery } from "@/redux/features/analytics/analyticsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const timeOptions = [
  { value: "1", label: "Today" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "365", label: "Last year" },
];
const PlatformInsights = () => {
  const [selectedTime, setSelectedTime] = useState<string>("7");

  const {
    data: platformInsightData,
    isLoading,
    error,
  } = useGetAdminDashboardPlatformInsightsInfoQuery(selectedTime);

  //   console.log(selectedTime);
  const platformInsight = platformInsightData?.data;

  return (
    // <div className="lg:col-span-3">
    <div className="bg-white border border-dashed border-slate-300  rounded-none p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Platform Insights</h3>
        <Select value={selectedTime} onValueChange={setSelectedTime}>
          <SelectTrigger className="w-[120px]  focus:ring-0 h-7 text-xs ">
            <SelectValue
              placeholder="Select time period"
              className="text-slate-300 text-xs"
            />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((t) => (
              <SelectItem key={t.value} value={t.value} className="text-xs">
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded flex justify-between">
          <p className="text-sm font-medium text-blue-800">Peak Hours</p>
          <p className="text-xs text-blue-600">2:00 PM - 5:00 PM</p>
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded flex justify-between">
          <p className="text-sm font-medium text-green-800">Top Category</p>
          <p className="text-xs text-green-600">
            {isLoading ? (
              <span className="inline-flex items-center h-1">
                <span className="text-gray-600">Loading...</span>
              </span>
            ) : error ? (
              <span className="text-red-600">Failed to load</span>
            ) : (
              <>
                {platformInsight?.topCategory?.name} (
                {platformInsight?.topCategory?.percentage}% of sales)
              </>
            )}
          </p>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded flex justify-between">
          <p className="text-sm font-medium text-purple-800">New Shops</p>
          <p className="text-xs text-purple-600">
            {isLoading ? (
              <span className="text-gray-600">Loading...</span>
            ) : error ? (
              <span className="text-red-600">Failed to load</span>
            ) : (
              <>{platformInsight?.shops} shops joined this week</>
            )}
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default PlatformInsights;
