/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomJwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};
