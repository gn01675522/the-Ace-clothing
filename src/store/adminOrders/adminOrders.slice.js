import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAdminOrdersAsync,
  updateAdminOrdersAsync,
  deleteAdminOrdersAsync,
} from "./adminOrders.asyncThunk";

const INITIAL_STATE = {
  orders: [],
  pagination: {},
  tempData: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: INITIAL_STATE,
  reducers: {
    setAdminOrdersIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setAdminOrdersTempData(state, action) {
      state.tempData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAdminOrdersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 取得 API 內的 Admin Orders 資料 ****************************************

      .addCase(updateAdminOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminOrdersAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(updateAdminOrdersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //* 更新 API 內的 Admin Orders 資料 ****************************************

      .addCase(deleteAdminOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminOrdersAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalOpen = false;
      })
      .addCase(deleteAdminOrdersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //*  刪除 API 內的 Admin Orders 資料 ****************************************
  },
});

export const { setAdminOrdersIsModalOpen, setAdminOrdersTempData } =
  adminOrdersSlice.actions;
export const adminOrdersReducer = adminOrdersSlice.reducer;
