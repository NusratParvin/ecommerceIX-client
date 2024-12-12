import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
  role?: string;
  profilePhoto?: string;
  iat?: number;
  exp?: number;
}

export type TUserRole = "USER" | "VENDOR" | "ADMIN";

export type TCategory = {
  id: string;
  name: string;
  imageUrl: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number;
  products?: Product[];
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
  owner?: TUser; // Owner of the shop
  products?: Product[]; // Products in the shop
  followers?: TShopFollower[]; // Followers of the shop
}
export interface TShopFollower {
  userId: string;
  shopId: string;
  followedAt: Date;

  // Relations
  user?: TUser;
  shop?: TShop;
}

export type TActiveStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED" | "DELETED";

export interface TUser {
  id: string;
  name: string;
  email: string;
  password?: string; // Exclude this in responses for security
  profilePhoto?: string;
  role: TUserRole;
  status: TActiveStatus;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  shops?: TShop[]; // Owned shops
  orders?: TOrder[]; // Orders placed
  reviews?: TReview[]; // Reviews given
  followedShops?: TShopFollower[]; // Followed shops
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  discount: number;
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
  status?: string;
  OrderItem?: TOrderItem[];
  reviews: TReview[];
}
export type TPaymentStatus = "PAID" | "UNPAID";

export interface TOrder {
  id: string;
  userId: string;
  totalPrice: number;
  paymentStatus: TPaymentStatus;
  paymentMethod: string;
  couponId?: string;
  createdAt: Date;

  // Relations
  user?: TUser;
  coupon?: TCoupon;
  items?: TOrderItem[];
}

export interface TOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;

  // Relations
  order?: TOrder;
  product?: Product;
}
export interface TReview {
  id: number;
  rating: number;
  comment?: string;
  userId: string;
  productId: string;
  createdAt: Date;
  isDeleted: boolean;

  // Relations
  user?: TUser;
  product?: Product;
}
export interface TCoupon {
  id: string;
  code: string;
  discountAmount: number;
  expirationDate: Date;
  createdAt: Date;

  // Relations
  orders?: TOrder[];
}

export interface TShopOwner {
  id: string;
  name: string;
  email: string;
}

export interface TShopInputProp {
  id: string;
  name: string;
  description: string;
  logo: string;
  ownerId: string;
  owner: TShopOwner;
  status: "ACTIVE" | "BLACKLISTED" | "RESTRICTED" | "DELETED";
  productCount: number;
  followerCount: number;
  createdAt: string;
  updatedAt: string;
}

export type CustomError = Error & { data?: { message?: string } };

export interface ProductFilters {
  minPrice: number;
  maxPrice: number;
  category: string;
  search: string;
}
