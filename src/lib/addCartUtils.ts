// import {
//   addToCart,
//   replaceCart,
//   CartItem,
// } from "@/redux/features/cart/cartSlice";
// import { AppDispatch } from "@/redux/store";
// import { Product } from "@/types";
// import { toast } from "sonner";

// interface AddToCartProps {
//   product: Product;
//   quantity: number;
// }

// export const handleAddToCart = (
//   dispatch: AppDispatch,
//   { product, quantity }: AddToCartProps
// ) => {
//   try {
//     dispatch(addToCart({ productInfo: product, quantity }));
//     toast.success(`${product.name} added to cart`, {
//       className: "text-green-600",
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     if (
//       (error.message === "Cart contains products from a different vendor.",
//       {
//         className: "text-red-600",
//       })
//     ) {
//       throw error;
//     }
//     toast.error(error.message || "Error adding to cart", {
//       className: "text-red-600",
//     });
//   }
// };

// export const handleReplaceCart = (
//   dispatch: AppDispatch,
//   { product, quantity }: AddToCartProps
// ) => {
//   try {
//     const newCart: { items: CartItem[]; vendorId: string } = {
//       items: [{ productInfo: product, quantity }],
//       vendorId: product.shopId,
//     };
//     dispatch(replaceCart(newCart));
//     toast.success(`Cart replaced with ${product.name}`, {
//       className: "text-green-600",
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     toast.error(error.message || "Error replacing cart", {
//       className: "text-red-600",
//     });
//   }
// };

import {
  addToCart,
  replaceCart,
  CartItem,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { AppDispatch } from "@/redux/store";
import { Product } from "@/types";
import { toast } from "sonner";

interface AddToCartProps {
  product: Product;
  quantity: number;
}

export const handleAddToCart = (
  dispatch: AppDispatch,
  { product, quantity }: AddToCartProps
) => {
  try {
    dispatch(addToCart({ productInfo: product, quantity }));
    toast.success(`${product.name} added to cart`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "Cart contains products from a different vendor.") {
      throw error;
    }
    toast.error(error.message || "Error adding to cart");
  }
};

export const handleReplaceCart = (
  dispatch: AppDispatch,
  { product, quantity }: AddToCartProps
) => {
  try {
    const newCart: { items: CartItem[]; vendorId: string } = {
      items: [{ productInfo: product, quantity }],
      vendorId: product.shopId,
    };
    dispatch(replaceCart(newCart));
    toast.success(`Cart replaced with ${product.name}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "Error replacing cart");
  }
};

export const handleUpdateQuantity = (
  dispatch: AppDispatch,
  productId: string,
  newQuantity: number
) => {
  try {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "Error updating quantity");
  }
};
