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

export interface TShop {
  id: string;
  name: string;
  description: string;
  logo?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  productCount?: number;
}

// export interface Product {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   stock: number;
//   discount?: number;
//   shopId?: string;
//   categoryId: string;
//   category: string;
//   imageUrl?: string;
//   isFlashSale: boolean;
//   flashSalePrice?: number;
//   flashSaleStartDate?: Date;
//   flashSaleEndDate?: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   isDeleted: boolean;
// }
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  discount?: number | null;
  shopId?: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  shop?: {
    id: string;
    name: string;
    description: string;
    logo?: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
  };
  imageUrl?: string;
  isFlashSale: boolean;
  flashSalePrice?: number | null;
  flashSaleStartDate?: Date | null;
  flashSaleEndDate?: Date | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
