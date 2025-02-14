"use server";

import { cookies } from "next/headers";

// import { cookies } from "next/headers";
// import { FieldValues } from "react-hook-form";
// import { jwtDecode } from "jwt-decode";

// import axiosInstance from "../lib/AxiosInstance";
// import { IUserJwtPayload } from "../types";

// export const register = async (userData: FieldValues) => {
//   try {
//     const { data } = axiosInstance.post("/auth/register", userData);

//     if (data.success) {
//       cookies().set("accessToken", data?.data?.accessToken);
//       cookies().set("refreshToken", data?.data?.refreshToken);
//     }
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// };

// export const login = async (userData: FieldValues) => {
//   try {
//     const { data } = axiosInstance.post("/auth/login", userData);

//     if (data.success) {
//       cookies().set("accessToken", data?.data?.accessToken);
//       cookies().set("refreshToken", data?.data?.refreshToken);
//     }
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// };

export const logoutCookies = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  return { success: true };
};
export const setCookies = (accessToken: string, refreshToken: string) => {
  cookies().set("accessToken", accessToken);
  cookies().set("refreshToken", refreshToken);

  return { success: true };
};
export const getCookies = () => {
  const accessToken = cookies().get("accessToken")?.value || null;
  const refreshToken = cookies().get("refreshToken")?.value || null;

  return {
    success: !!accessToken && !!refreshToken,
    accessToken,
    refreshToken,
  };
};

// export const getCurrentUser = () => {
//   const accessToken = cookies().get("accessToken")?.value;
//   let decodedToken: IUserJwtPayload | null = null;

//   if (accessToken) {
//     decodedToken = jwtDecode<IUserJwtPayload>(accessToken);

//     return {
//       _id: decodedToken._id,
//       name: decodedToken.name,
//       email: decodedToken.email,
//       role: decodedToken.role,
//       profilePhoto: decodedToken.profilePhoto,
//     };
//   }
// };

// export const getNewAccessToken = async () => {
//   try {
//     const refreshToken = cookies().get("refreshToken")?.value;

//     const res = await axiosInstance({
//       url: "/auth/refresh-token",
//       method: "POST",
//       withCredentials: true,
//       headers: {
//         cookie: `refreshToken=${refreshToken}`,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     throw new Error("Failed to get new access token");
//   }
// };
