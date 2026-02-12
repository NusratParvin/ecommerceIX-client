import baseApi from "@/redux/api/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardAnalyticsInfo: builder.query({
      query: () => ({
        url: "/analytics/dashboard",
        method: "GET",
      }),
    }),

    getAdminDashboardUserGrowthChartInfo: builder.query({
      query: (year) => ({
        url: "/analytics/dashboard/user-growth",
        method: "GET",
        params: { year },
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

    getAdminDashboardPlatformInsightsInfo: builder.query({
      query: (period) => ({
        url: "analytics/dashboard/platform-insights",
        method: "GET",
        params: { period },
      }),
    }),

    getAdminDashboardRecentOrdersInfo: builder.query({
      query: () => ({
        url: "/analytics/dashboard/recent-orders",
        method: "GET",
      }),
    }),

    getAdminDashboardRecentReviewsInfo: builder.query({
      query: () => ({
        url: "/analytics/dashboard/recent-reviews",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAdminDashboardAnalyticsInfoQuery,
  useGetAdminDashboardUserGrowthChartInfoQuery,
  useGetAdminDashboardSalesTrendChartInfoQuery,
  useGetAdminDashboardShopPerformanceChartInfoQuery,
  useGetAdminDashboardCategoryDistributionChartInfoQuery,
  useGetAdminDashboardPlatformInsightsInfoQuery,
  useGetAdminDashboardRecentOrdersInfoQuery,
  useGetAdminDashboardRecentReviewsInfoQuery,
} = analyticsApi;

export default analyticsApi;
