import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
  role?: string;
  profilePhoto?: string;
}

export type TUserRole = "USER" | "VENDOR" | "ADMIN";

export type TCategory = {
  id: string;
  name: string;
  imageUrl?: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number;
};
