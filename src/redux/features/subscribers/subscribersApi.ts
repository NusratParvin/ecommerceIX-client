import baseApi from "../../api/baseApi";

export const subscribersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all subscribers
    getSubscribers: builder.query({
      query: () => ({
        url: "/subscribers",
        method: "GET",
      }),
      providesTags: [{ type: "Subscribers", id: "LIST" }],
    }),

    // Add a new subscriber
    addSubscriber: builder.mutation({
      query: ({ email }) => ({
        url: "/subscribers",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: [{ type: "Subscribers", id: "LIST" }],
    }),

    // Unsubscribe a subscriber
    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `/subscribers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Subscribers", id: "LIST" }],
    }),

    // Fetch a single subscriber by ID (Optional)
    getSubscriberById: builder.query({
      query: (id) => ({
        url: `/subscribers/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Subscribers", id }],
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useAddSubscriberMutation,
  useDeleteSubscriberMutation,
  useGetSubscriberByIdQuery,
} = subscribersApi;
