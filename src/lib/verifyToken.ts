import { CustomJwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
