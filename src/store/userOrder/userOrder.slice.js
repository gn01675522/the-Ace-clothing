import { createSlice } from "@reduxjs/toolkit";

import {
  setPostUserOrderAsync,
  fetchUserOrderDataAsync,
} from "./userOrder.asyncThunk";

const INITIAL_STATE = {
  orderData: null,
  orderId: null,
  error: null,
  isLoading: false,
};

export const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: INITIAL_STATE,
  reducers: {
    setClearUserOrderState() {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPostUserOrderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPostUserOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload;
      })
      .addCase(setPostUserOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrderDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrderDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchUserOrderDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setClearUserOrderState } = userOrderSlice.actions;
export const userOrderReducer = userOrderSlice.reducer;
