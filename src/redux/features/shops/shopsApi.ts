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
      query: ({
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => ({
        url: "/shops",
        method: "GET",
        params: { page, limit, sortBy, sortOrder },
      }),
      providesTags: ["Shops"],
    }),

    updateShop: builder.mutation({
      query: ({ shopId, data }) => ({
        url: `/shops/${shopId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Shops"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useUpdateShopMutation,
  useGetShopByOwnerQuery,
  useGetAllShopsQuery,
  useLazyGetShopByOwnerQuery,
} = shopApi;
