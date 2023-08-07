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
  extraReducers: {
    [fetchAdminProductAsync.pending](state) {
      state.isLoading = true;
    },
    [fetchAdminProductAsync.fulfilled](state, action) {
      state.isLoading = false;
      state.products = action.payload.products;
    },
    [fetchAdminProductAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteAdminProductAsync.pending](state) {
      state.isLoading = true;
    },
    [deleteAdminProductAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [deleteAdminProductAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updateAdminProductAsync.pending](state) {
      state.isLoading = true;
    },
    [updateAdminProductAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [updateAdminProductAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [createAdminProductAsync.pending](state) {
      state.isLoading = true;
    },
    [createAdminProductAsync.fulfilled](state) {
      state.isLoading = false;
      state.isModalOpen = false;
    },
    [createAdminProductAsync.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const adminProductReducer = (state = INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case FETCH_ADMIN_PRODUCT_START:
//     case SET_ADMIN_PRODUCT_START:
//       return { ...state, isLoading: true };

//     case FETCH_ADMIN_PRODUCT_SUCCESS:
//       return { ...state, products: payload.products, isLoading: false };

//     case FETCH_ADMIN_PRODUCT_FAILED:
//       return { ...state, isLoading: false, error: payload };

//     case SET_ADMIN_PRODUCT_SUCCESS:
//       return { ...state, isLoading: false, isModalOpen: false };

//     case SET_ADMIN_PRODUCT_FAILED:
//       return { ...state, isLoading: false, error: payload };

//     case SET_ADMIN_PRODUCT_TEMP_DATA:
//       return { ...state, tempData: payload };

//     case SET_ADMIN_PRODUCT_IS_OPEN:
//       return { ...state, isModalOpen: payload };

//     default:
//       return state;
//   }
// };

export const { setAdminProductModalOpen, setAdminProductTempData } =
  adminProductSlice.actions;
export const adminProductReducer = adminProductSlice.reducer;
