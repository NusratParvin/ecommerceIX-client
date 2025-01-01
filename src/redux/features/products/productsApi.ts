import baseApi from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page,
        limit,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
        category,
        shop,
        rating,
        search,
      }) => ({
        url: `/products`,
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          minPrice,
          maxPrice,
          category,
          shop,
          rating,
          search,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "Products",
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    getFlashSaleProducts: builder.query({
      query: ({
        page,
        limit,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
        category,
        shop,
        search,
      }) => ({
        url: "/products/flash-Sale",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          minPrice,
          maxPrice,
          category,
          shop,
          search,
        },
      }),
      providesTags: ["FlashSaleProducts"],
    }),

    // Get admin products
    getProductsForAdmin: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm }) => ({
        url: `/products/get`,
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
        },
      }),
      // providesTags: ["Products"],
    }),

    // Get vendor products

    getProductsForVendor: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm }) => ({
        url: `/products/vendor`,
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "VENDOR_LIST" },
            ]
          : [{ type: "Products", id: "VENDOR_LIST" }],
      keepUnusedDataFor: 0,
    }),

    // Get a single product by ID

    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/products/category/${categoryId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update an existing product
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: formData,
      }),

      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),

    // Update an status of product
    updateProductStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/products/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),

    // Soft delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),

    getBestSellerProducts: builder.query({
      query: () => ({
        url: "/products/bestselling",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFlashSaleProductsQuery,
  useLazyGetProductsQuery,
  useGetProductsForAdminQuery,
  useGetProductsForVendorQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,

  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
  useGetBestSellerProductsQuery,
} = productApi;

export default productApi;
