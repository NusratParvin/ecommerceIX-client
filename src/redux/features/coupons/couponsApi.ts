import baseApi from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (coupon) => ({
        url: `/coupons`,
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["Coupons"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/coupons/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Coupons"],
    }),

    getAllCoupons: builder.query({
      query: (args) => ({
        url: "/coupons",
        method: "GET",
        params: args,
      }),
      providesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/coupons/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),

    applyCoupon: builder.mutation({
      query: (couponCode) => ({
        url: "/coupons/apply-coupon",
        method: "POST",
        body: couponCode,
      }),
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
} = categoryApi;

export default categoryApi;
