import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAdminCouponsAsync,
  createAdminCouponAsync,
  deleteAdminCouponsAsync,
  updateAdminCouponAsync,
} from "./adminCoupons.asyncThunk";

const INITIAL_STATE = {
  coupons: [],
  pagination: {},
  tempData: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminCouponsSlice = createSlice({
  name: "adminCoupons",
  initialState: INITIAL_STATE,
  reducers: {
    setAdminCouponsOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setAdminCouponsTempData(state, action) {
      state.tempData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCouponsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminCouponsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload.coupons;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAdminCouponsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 取得 API 內的 Admin Coupons 資料 ****************************************

      .addCase(deleteAdminCouponsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminCouponsAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(deleteAdminCouponsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 刪除 API 內的 Admin Coupons 資料 ****************************************

      .addCase(createAdminCouponAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminCouponAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(createAdminCouponAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 於 API 內創建 Admin Coupons 資料 ****************************************

      .addCase(updateAdminCouponAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminCouponAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(updateAdminCouponAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //* 更新 API 內的 Admin Coupons 資料 ****************************************
  },
});

export const { setAdminCouponsOpen, setAdminCouponsTempData } =
  adminCouponsSlice.actions;
export const adminCouponsReducer = adminCouponsSlice.reducer;
