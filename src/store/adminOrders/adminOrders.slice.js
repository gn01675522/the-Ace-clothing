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
  extraReducers: {
    [fetchAdminOrdersAsync.pending](state) {
      state.isLoading = true;
    },
    [fetchAdminOrdersAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.pagination = action.payload.pagination;
    },
    [fetchAdminOrdersAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updateAdminOrdersAsync.pending](state) {
      state.isLoading = true;
    },
    [updateAdminOrdersAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [updateAdminOrdersAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteAdminOrdersAsync.pending](state) {
      state.isLoading = true;
    },
    [deleteAdminOrdersAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [deleteAdminOrdersAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setAdminOrdersIsModalOpen, setAdminOrdersTempData } =
  adminOrdersSlice.actions;
export const adminOrdersReducer = adminOrdersSlice.reducer;
