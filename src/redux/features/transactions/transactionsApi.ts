import baseApi from "../../api/baseApi";

export const TransactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminTransactions: builder.query({
      query: ({
        page,
        limit,
        searchTerm,
        userId,
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => ({
        url: "/transactions/admin",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          userId,
          sortBy,
          sortOrder,
        },
      }),
    }),
  }),
});

export const { useGetAdminTransactionsQuery } = TransactionsApi;
