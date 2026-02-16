// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Product } from "@/types";

// export interface CartItem {
//   productInfo: Product;
//   quantity: number;
// }

// export interface CartState {
//   items: CartItem[];
//   vendorId: string | null;
// }

// const initialState: CartState = {
//   items: [],
//   vendorId: null,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (
//       state,
//       action: PayloadAction<{ productInfo: Product; quantity: number }>
//     ) => {
//       const { productInfo, quantity } = action.payload;

//       if (state.vendorId && state.vendorId !== productInfo.shopId) {
//         throw new Error("Cart contains products from a different vendor.");
//       }

//       const existingItem = state.items.find(
//         (item) => item.productInfo.id === productInfo.id
//       );

//       if (existingItem) {
//         const newQuantity = existingItem.quantity + quantity;
//         if (newQuantity > productInfo.stock) {
//           throw new Error("Cannot add more than available stock.");
//         }
//         existingItem.quantity = newQuantity;
//       } else {
//         if (quantity > productInfo.stock) {
//           throw new Error("Cannot add more than available stock.");
//         }
//         state.items.push({ productInfo, quantity });
//         state.vendorId = productInfo.shopId;
//       }
//     },

//     replaceCart: (
//       state,
//       action: PayloadAction<{ items: CartItem[]; vendorId: string }>
//     ) => {
//       state.items = action.payload.items;
//       state.vendorId = action.payload.vendorId;
//     },

//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(
//         (item) => item.productInfo.id !== action.payload
//       );
//       if (state.items.length === 0) {
//         state.vendorId = null;
//       }
//     },

//     clearCart: (state) => {
//       state.items = [];
//       state.vendorId = null;
//     },

//     updateQuantity: (
//       state,
//       action: PayloadAction<{ productId: string; quantity: number }>
//     ) => {
//       const { productId, quantity } = action.payload;
//       const item = state.items.find(
//         (item) => item.productInfo.id === productId
//       );
//       if (item && quantity > 0 && quantity <= item.productInfo.stock) {
//         item.quantity = quantity;
//       }
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   clearCart,
//   replaceCart,
//   updateQuantity,
// } = cartSlice.actions;

// export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

export interface CartItem {
  productInfo: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  vendorId: string | null;
}

const initialState: CartState = {
  items: [],
  vendorId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ productInfo: Product; quantity: number }>,
    ) => {
      const { productInfo, quantity } = action.payload;

      // If cart is empty, set the vendor ID
      if (state.items.length === 0) {
        state.vendorId = productInfo.shopId;
      }

      // Check if the product is from a different vendor
      // if (state.vendorId && state.vendorId !== productInfo.shopId) {
      //   throw new Error("Cart contains products from a different vendor.");
      // }

      // Check if the product already exists in cart
      const existingItem = state.items.find(
        (item) => item.productInfo.id === productInfo.id,
      );

      if (existingItem) {
        // Calculate new quantity
        const newQuantity = existingItem.quantity + quantity;

        // Check if new quantity exceeds stock
        if (newQuantity > productInfo.stock) {
          throw new Error("Cannot add more than available stock.");
        }

        existingItem.quantity = newQuantity;
      } else {
        // Check if initial quantity exceeds stock
        if (quantity > productInfo.stock) {
          throw new Error("Cannot add more than available stock.");
        }

        state.items.push({ productInfo, quantity });
      }
    },

    replaceCart: (
      state,
      action: PayloadAction<{ items: CartItem[]; vendorId: string }>,
    ) => {
      state.items = action.payload.items;
      state.vendorId = action.payload.vendorId;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productInfo.id !== action.payload,
      );

      if (state.items.length === 0) {
        state.vendorId = null;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.vendorId = null;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.productInfo.id === productId,
      );

      if (item) {
        // Validate against stock limit
        if (quantity <= 0) {
          throw new Error("Quantity must be greater than 0");
        }
        if (quantity > item.productInfo.stock) {
          throw new Error("Cannot exceed available stock");
        }
        item.quantity = quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  replaceCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
