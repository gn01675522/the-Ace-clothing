import { createSelector } from "@reduxjs/toolkit";

const selectUserReducer = (state) => state.user;
//* 選取 rootReducer 上的 user reducer

export const selectUserLoginIsSuccess = createSelector(
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

export const selectUserFavorite = createSelector(
  [selectUserReducer],
  (user) => user.favorite
);
