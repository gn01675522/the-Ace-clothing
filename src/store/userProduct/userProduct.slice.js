import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUserProductAsync,
  fetchUserSingleProductAsync,
} from "./userProduct.asyncThunk";

const INITIAL_STATE = {
  products: [],
  product: {},
  pagination: {},
  isLoading: false,
  error: null,
};

export const userProductSlice = createSlice({
  name: "userProduct",
  initialState: INITIAL_STATE,
  reducers: {
    clearUserProduct() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchUserProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserSingleProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserSingleProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchUserSingleProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserProduct } = userProductSlice.actions;
export const userProductReducer = userProductSlice.reducer;
