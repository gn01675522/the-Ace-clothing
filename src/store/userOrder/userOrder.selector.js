import { createSelector } from "@reduxjs/toolkit";

const selectUserOrderReducer = (state) => state.userOrder;

export const selectUserOrderIsLoading = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.isLoading
);

export const selectUserOrderId = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.orderId
);

