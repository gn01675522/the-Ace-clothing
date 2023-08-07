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
  extraReducers: {
    [fetchUserProductAsync.pending](state) {
      state.isLoading = true;
    },
    [fetchUserProductAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    [fetchUserProductAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchUserSingleProductAsync.pending](state) {
      state.isLoading = true;
    },
    [fetchUserSingleProductAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
    [fetchUserSingleProductAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearUserProduct } = userProductSlice.actions;
export const userProductReducer = userProductSlice.reducer;
