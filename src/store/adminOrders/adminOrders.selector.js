import { createSelector } from "@reduxjs/toolkit";

const selectAdminOrdersReducer = (state) => state.adminOrders;

export const selectAdminOrders = createSelector(
  [selectAdminOrdersReducer],
  (adminOrders) => adminOrders.orders
);

export const selectAdminOrdersPagination = createSelector(
  [selectAdminOrdersReducer],
  (adminOrders) => adminOrders.pagination
);

export const selectAdminOrdersIsLoading = createSelector(
  [selectAdminOrdersReducer],
  (adminOrders) => adminOrders.isLoading
);

export const selectAdminOrdersIsModalOpen = createSelector(
  [selectAdminOrdersReducer],
  (adminOrders) => adminOrders.isModalOpen
);

export const selectAdminOrdersTempData = createSelector(
  [selectAdminOrdersReducer],
  (adminOrders) => adminOrders.tempData
);
