import baseApi from "../../api/baseApi";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: "/reviews",
        method: "POST",
        body: {
          productId,
          rating,
          comment,
        },
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),

    getProductReview: builder.query({
      query: (productId) => ({
        url: `/reviews/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSubmitReviewMutation, useGetProductReviewQuery } = reviewsApi;
