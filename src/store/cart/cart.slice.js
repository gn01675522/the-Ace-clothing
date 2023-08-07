import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCartItemsAsync,
  setAddItemToCartAsync,
  setRemoveItemFromCartAsync,
  setUpdateCartItemAsync,
} from "./cart.asyncThunk";

const INITIAL_STATE = {
  cartItems: {},
  loadingItems: [],
  error: null,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  extraReducers: {
    [fetchCartItemsAsync.pending](state) {
      state.isLoading = true;
    },
    [fetchCartItemsAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [fetchCartItemsAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [setAddItemToCartAsync.pending](state) {
      state.isLoading = true;
    },
    [setAddItemToCartAsync.fulfilled](state) {
      state.isLoading = false;
    },
    [setAddItemToCartAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [setRemoveItemFromCartAsync.pending](state) {
      state.isLoading = true;
    },
    [setRemoveItemFromCartAsync.fulfilled](state) {
      state.isLoading = false;
    },
    [setRemoveItemFromCartAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [setUpdateCartItemAsync.pending](state, action) {
      state.isLoading = true;
      state.loadingItems = [...state.loadingItems, action.meta.arg.item.id];
    },
    [setUpdateCartItemAsync.fulfilled](state) {
      state.isLoading = false;
      state.loadingItems = [];
      //* 之所以 loadingItems 會使用空陣列是因為原先的防呆方法會在購物車內快速調整兩個商品的時候造成其中一個商品 select 被永久 disabled
    },
    [setUpdateCartItemAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
