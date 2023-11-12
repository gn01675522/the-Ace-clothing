// 此 redux 與其他 redux 有 action 上的交互：
// 1. adminProduct
import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAdminProductAsync,
  deleteAdminProductAsync,
  updateAdminProductAsync,
  createAdminProductAsync,
} from "./adminProduct.asyncThunk";

const INITIAL_STATE = {
  products: [],
  tempData: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: INITIAL_STATE,
  reducers: {
    setAdminProductTempData(state, action) {
      state.tempData = action.payload;
    },
    setAdminProductModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 取得 API 內的 Admin Products 資料 ****************************************

      .addCase(deleteAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminProductAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(deleteAdminProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 刪除 API 內的 Admin Products 資料 ****************************************

      .addCase(updateAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminProductAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(updateAdminProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 更新 API 內的 Admin Products 資料 ****************************************

      .addCase(createAdminProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminProductAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(createAdminProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //* 於 API 內創造 Admin Products 資料 ****************************************
  },
});

export const { setAdminProductModalOpen, setAdminProductTempData } =
  adminProductSlice.actions;
export const adminProductReducer = adminProductSlice.reducer;
