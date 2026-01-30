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

    getAdminDashboardShopPerformanceChartInfo: builder.query({
      query: () => ({
        url: "/analytics/dashboard/shop-performance",
        method: "GET",
      }),
    }),

    getAdminDashboardCategoryDistributionChartInfo: builder.query({
      query: () => ({
        url: "/analytics/dashboard/category-distribution",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAdminDashboardAnalyticsInfoQuery,
  useGetAdminDashboardSalesTrendChartInfoQuery,
  useGetAdminDashboardShopPerformanceChartInfoQuery,
  useGetAdminDashboardCategoryDistributionChartInfoQuery,
} = analyticsApi;
export default analyticsApi;
