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

    getAllProductsReview: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm }) => ({
        url: `/reviews`,
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
        },
      }),
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSubmitReviewMutation,
  useGetProductReviewQuery,
  useGetAllProductsReviewQuery,
  useDeleteReviewMutation,
} = reviewsApi;
