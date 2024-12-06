import baseApi from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm }) => ({
        url: `/products`,
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
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
