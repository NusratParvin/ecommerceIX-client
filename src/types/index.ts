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
  _count?: {
    products: number;
    followers: number;
  };
}
export interface TShopFollower {
  userId: string;
  shopId: string;
  followedAt: Date;
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
  shops?: TShop[];
  orders?: TOrder[];
  reviews?: TReview[];
  followedShops?: TShopFollower[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  discount: number;
  rating: number;
  shopId: string;
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
    status?: string;
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
  shopId: string;
  totalPrice: number;
  paymentStatus: TPaymentStatus;
  paymentMethod: string;
  couponId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shippingInfo: Record<string, any>;
  createdAt: Date;

  // Relations
  user: TUser;
  shop: TShop;
  coupon?: TCoupon;
  items: TOrderItem[];
  transaction?: TTransaction[];
}

export interface TTransaction {
  id: string;
  orderId?: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: "PAID" | "UNPAID";
  type: "ORDER_PAYMENT" | "SHOP_PAYOUT";
  stripePaymentIntentId: string;
  createdAt: Date;
  description?: string;

  // Relations
  order?: TOrder;
  user: TUser;
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
  id: string;
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
  expirationDate: string;
  createdAt: string;
  orders?: TOrder[];
}
// export interface TCoupon {
//   id: string;
//   code: string;
//   discountAmount: number;
//   expirationDate: Date;
//   createdAt: Date;

//   // Relations
//   orders?: TOrder[];
// }

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
  productCount?: number;
  followerCount?: number;
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

export interface CartItems {
  productId: string;
  quantity: number;
  price: number;
  shopId: string;
}

export interface ShippingInfoProps {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  name: string;
}

export interface ProcessOrderAndPaymentProps {
  userId: string;
  shopId: string;
  items: CartItems[];
  totalPrice: number;
  couponId: string | null;
  shippingInfo: ShippingInfoProps;
  paymentIntentId: string;
}

export interface ErrorData {
  success: boolean;
  status: number;
  message: string;
}
