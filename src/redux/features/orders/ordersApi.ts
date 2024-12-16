import { ProcessOrderAndPaymentProps } from "@/types";
import baseApi from "../../api/baseApi";

const OrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // New endpoint for saving order details
    saveOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),

    processOrderAndPayment: builder.mutation<void, ProcessOrderAndPaymentProps>(
      {
        query: (paymentData) => ({
          url: "/orders/process-order-payment",
          method: "POST",
          body: paymentData,
        }),
      }
    ),

    getOrders: builder.query({
      query: ({
        page,
        limit,
        userId,
        shopId,
        searchTerm,
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => ({
        url: `/orders/all-orders`,
        method: "GET",
        params: {
          page,
          limit,
          userId,
          shopId,
          searchTerm,
          sortBy,
          sortOrder,
        },
      }),
      providesTags: ["Orders"],
    }),

    getOrdersByShop: builder.query({
      query: ({
        // shopId,
        page,
        limit,
        sortBy = "createdAt",
        sortOrder = "desc",
        searchTerm,
      }) => ({
        url: "/orders/shop-orders",
        method: "GET",
        params: {
          // shopId,

          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
        },
      }),
      providesTags: (result, error, arg) => [
        { type: "Orders", id: arg.shopId },
      ],
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `orders/${orderId}/details`,
        method: "GET",
      }),
    }),

    getUserOrders: builder.query({
      query: ({ page, limit, searchTerm, sortBy, sortOrder }) => ({
        url: "/orders/user-orders",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          sortBy,
          sortOrder,
        },
      }),
      providesTags: (result, error, args) => [
        { type: "Orders", id: args.userId },
      ],
    }),

    getUserPurchaseDetailsById: builder.query({
      query: (orderId) => ({
        url: `/orders/purchaseDetails/${orderId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSaveOrderMutation,
  useProcessOrderAndPaymentMutation,
  useGetOrdersQuery,
  useGetOrdersByShopQuery,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  useGetUserPurchaseDetailsByIdQuery,
} = OrdersApi;
