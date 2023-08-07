import { createSlice } from "@reduxjs/toolkit";

import { setCurrentUserAsync } from "./user.asyncThunk";

const INITIAL_STATE = {
  isSuccess: false,
  message: "",
  favorite: JSON.parse(localStorage.getItem("wishlist")) || [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserFavorite(state, action) {
      state.favorite = action.payload;
    },
  },
  extraReducers: {
    [setCurrentUserAsync.pending](state) {
      state.isLoading = true;
    },
    [setCurrentUserAsync.fulfilled](state, action) {
      state.isSuccess = action.payload;
      state.isLoading = false;
    },
    [setCurrentUserAsync.rejected](state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const { setUserFavorite } = userSlice.actions;
export const userReducer = userSlice.reducer;
