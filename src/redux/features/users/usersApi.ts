import baseApi from "../../api/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users with optional filters, sorting, and pagination
    getUsers: builder.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm }) => ({
        url: "/users",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm,
        },
      }),
      providesTags: ["Users"],
    }),

    // Get a single user by ID
    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // Update user status
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Users"],
    }),

    // Update user role
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),

    // Delete a user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,

  useDeleteUserMutation,
} = usersApi;

export default usersApi;
