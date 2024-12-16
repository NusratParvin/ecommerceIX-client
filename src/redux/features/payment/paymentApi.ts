import baseApi from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => ({
        url: "/payments",
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),

    createPaymentIntent: builder.mutation({
      query: ({
        amount,
        // cartId,
        userId,
      }: {
        amount: number;
        // cartId: string;
        userId: string;
      }) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body: { amount, userId },
      }),
    }),

    deletePayment: builder.mutation({
      query: (transactionId) => ({
        url: `/payments/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useCreatePaymentIntentMutation,
  useDeletePaymentMutation,
} = paymentApi;
