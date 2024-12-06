import baseApi from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm }) => ({
        url: `/categories`,
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
        },
      }),
      providesTags: ["Categories"],
    }),

    getCategoriesForAll: builder.query({
      query: () => ({
        url: `/categories/get`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    // Create a new category
    createCategory: builder.mutation({
      query: (name) => ({
        url: "/categories",
        method: "POST",
        body: name,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update an existing category
    updateCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Soft delete a category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesForAllQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
