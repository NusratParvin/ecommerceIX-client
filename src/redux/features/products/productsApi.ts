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
          search,
        },
      }),
      providesTags: ["Products"],
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
      providesTags: ["Products"],
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
      providesTags: ["Products"],
    }),

    // Get a single product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
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
      invalidatesTags: ["Products"],
    }),

    // Update an status of product
    updateProductStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/products/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Products"],
    }),

    // Soft delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
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
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
