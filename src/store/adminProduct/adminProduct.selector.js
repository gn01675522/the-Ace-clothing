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

export const selectAdminProductDeleteState = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.deleteState
);
