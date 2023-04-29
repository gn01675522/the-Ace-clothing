import { createSelector } from "@reduxjs/toolkit";

const selectAdminProductReducer = (state) => state.adminProduct;

export const selectAdminProducts = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.products
);

export const selectAdminProductIsLoading = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.isLoading
);

export const selectAdminProductPagination = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.pagination
);

export const selectAdminProductActionState = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.actionState
);

export const selectAdminProductTempData = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.tempData
);

export const selectAdminProductIsModalOpen = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.isModalOpen
);

export const selectAdminProductMessage = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.message
);
