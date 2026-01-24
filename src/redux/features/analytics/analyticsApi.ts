import baseApi from "@/redux/api/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardAnalyticsInfo: builder.query({
      query: () => ({
        url: "/analytics/dashboard",
        method: "GET",
      }),
    }),

    getAdminDashboardSalesTrendChartInfo: builder.query({
      query: ({ month, year }) => ({
        url: "/analytics/dashboard/sales-trend",
        method: "GET",
        params: { month, year },
      }),
    }),
  }),
});

export const {
  useGetAdminDashboardAnalyticsInfoQuery,
  useGetAdminDashboardSalesTrendChartInfoQuery,
} = analyticsApi;
export default analyticsApi;
