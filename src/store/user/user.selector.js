import { createSelector } from "@reduxjs/toolkit";

const selectUserReducer = (state) => state.user;

export const selectUserLoginIsSuccess= createSelector(
  [selectUserReducer],
  (user) => user.isSuccess
);

export const selectUserLoginIsLoading = createSelector(
  [selectUserReducer],
  (user) => user.isLoading
);

export const selectUserLoginMessage = createSelector(
  [selectUserReducer],
  (user) => user.message
);
