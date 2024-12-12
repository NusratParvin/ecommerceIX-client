import baseApi from "../../api/baseApi";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopByOwner: builder.query({
      query: () => ({
        url: "/shops/myShop",
        method: "GET",
      }),
    }),

    createShop: builder.mutation({
      query: (formData) => ({
        url: "/shops",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Shops"],
    }),

    getAllShops: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm }) => ({
        url: "/shops",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
        },
      }),
      providesTags: ["Shops"],
    }),

    getAllShopsForAll: builder.query({
      query: () => ({
        url: "/shops/getShops",
        method: "GET",
      }),
      providesTags: ["Shops"],
    }),

    updateShopStatus: builder.mutation({
      query: ({ shopId, status }) => ({
        url: `/shops/${shopId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Shops"],
    }),

    updateShopByVendor: builder.mutation({
      query: ({ shopId, formData }) => ({
        url: `/shops/${shopId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Shops"],
    }),

    getFollowedShops: builder.query({
      query: () => ({
        url: "/shops/followedShops",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateShopMutation,
  useUpdateShopStatusMutation,
  useUpdateShopByVendorMutation,
  useGetShopByOwnerQuery,
  useGetAllShopsQuery,
  useGetAllShopsForAllQuery,
  useLazyGetShopByOwnerQuery,
  useGetFollowedShopsQuery,
} = shopApi;
