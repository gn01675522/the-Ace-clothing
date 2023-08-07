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
  extraReducers: {
    [fetchAdminCouponsAsync.pending](state) {
      state.isLoading = true;
    },
    [fetchAdminCouponsAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.coupons = action.payload.coupons;
      state.pagination = action.payload.pagination;
    },
    [fetchAdminCouponsAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteAdminCouponsAsync.pending](state) {
      state.isLoading = true;
    },
    [deleteAdminCouponsAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [deleteAdminCouponsAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [createAdminCouponAsync.pending](state) {
      state.isLoading = true;
    },
    [createAdminCouponAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [createAdminCouponAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updateAdminCouponAsync.pending](state) {
      state.isLoading = true;
    },
    [updateAdminCouponAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [updateAdminCouponAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setAdminCouponsOpen, setAdminCouponsTempData } =
  adminCouponsSlice.actions;
export const adminCouponsReducer = adminCouponsSlice.reducer;
