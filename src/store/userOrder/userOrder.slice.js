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
  extraReducers: {
    [setPostUserOrderAsync.pending](state) {
      state.isLoading = true;
    },
    [setPostUserOrderAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.orderId = action.payload;
    },
    [setPostUserOrderAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchUserOrderDataAsync.pending](state) {
      state.isLoading = true;
    },
    [fetchUserOrderDataAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.orderData = action.payload;
    },
    [fetchUserOrderDataAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const userOrderReducer = (state = INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_USER_ORDER_START:
//     case FETCH_USER_ORDER_DATA_START:
//       return { ...state, isLoading: true };

//     case SET_USER_ORDER_SUCCESS:
//       return {
//         ...state,
//         orderId: payload,
//         isLoading: false,
//       };

//     case FETCH_USER_ORDER_DATA_SUCCESS:
//       return {
//         ...state,
//         orderData: payload,
//         isLoading: false,
//       };

//     case SET_USER_ORDER_FAILED:
//     case FETCH_USER_ORDER_DATA_FAILED:
//       return { ...state, isLoading: false };

//     case SET_CLEAR_USER_ORDER_STATE:
//       return { ...INITIAL_STATE };

//     default:
//       return state;
//   }
// };

export const { setClearUserOrderState } = userOrderSlice.actions;
export const userOrderReducer = userOrderSlice.reducer;
