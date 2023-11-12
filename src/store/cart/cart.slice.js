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
  tempData: null,
  error: null,
  isLoading: false,
  isModalOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setCartIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setCartTempData(state, action) {
      state.tempData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 取得 API 內的 Carts 資料 ****************************************

      .addCase(setAddItemToCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setAddItemToCartAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setAddItemToCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 於 API 內新增 Carts 資料 ****************************************

      .addCase(setRemoveItemFromCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setRemoveItemFromCartAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setRemoveItemFromCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 於 API 內刪除 Carts 資料 ****************************************

      .addCase(setUpdateCartItemAsync.pending, (state, action) => {
        state.isLoading = true;
        state.loadingItems = [...state.loadingItems, action.meta.arg.item.id];
      })
      .addCase(setUpdateCartItemAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.loadingItems = [];
        //* 之所以 loadingItems 會使用空陣列是因為原先的防呆方法會在購物車內快速調整兩個商品的時候造成其中一個商品 select 被永久 disabled
      })
      .addCase(setUpdateCartItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //* 於 API 內更新 Carts 資料 ****************************************
  },
});

export const { setCartIsModalOpen, setCartTempData } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
