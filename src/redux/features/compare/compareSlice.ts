import { Product } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface CompareState {
  products: Product[];
}

const initialState: CompareState = {
  products: [],
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      if (state.products.length < 3) {
        state.products.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    clearCompare: (state) => {
      state.products = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
