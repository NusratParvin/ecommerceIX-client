import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    registerUser: builder.mutation({
      query: (newUserInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: newUserInfo,
      }),
    }),

    // resetPassword: builder.mutation({
    //   query: ({ id, newPassword, token }) => ({
    //     url: `/auth/reset-password`,
    //     method: "POST",
    //     body: { id, newPassword }, // No need to send the token in the body
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),

    // forgetPassword: builder.mutation({
    //   query: (email) => ({
    //     url: `/auth/forget-password`,
    //     method: "POST",
    //     body: { email },
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  //   useResetPasswordMutation,
  //   useForgetPasswordMutation,
} = authApi;
