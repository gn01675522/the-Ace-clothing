import { createSelector } from "@reduxjs/toolkit";

const selectUserOrderReducer = (state) => state.userOrder;

export const selectUserOrderData = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.orderData
);

export const selectUserOrderIsLoading = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.isLoading
);

export const selectUserOrderId = createSelector(
  [selectUserOrderReducer],
  (userOrder) => userOrder.orderId
);

export const selectUserOrderProducts = createSelector(
  [selectUserOrderData],
  (orderData) => Object.values(orderData?.products || {})
);

export const selectUserOrderTotalPrice = createSelector(
  [selectUserOrderProducts],
  (orderData) =>
    orderData.reduce(
      (total, productPrice) => total + productPrice.final_total,
      0
    )
);

export const selectUserOrderByEmail = (email) =>
  createSelector([selectUserOrderData], (orderData) =>
    orderData.filter((data) => data.user.email === email)
  );
