import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: envConfig.baseApi,
    baseUrl: "https://ix-server.vercel.app/api",
    // baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Shops",
    "Payments",
    "Auth",
    "Categories",
    "Products",
    "Coupons",
    "Orders",
    "FlashSaleProducts",
    "FollowedShops",
    "Reviews",
    "Subscribers",
  ],
  endpoints: () => ({}),
});

export default baseApi;
