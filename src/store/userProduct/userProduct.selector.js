import { createSelector } from "@reduxjs/toolkit";

const selectUserProductReducer = (state) => state.userProduct;

export const selectUserProduct = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.products
);

export const selectUserProductPagination = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.pagination
);

export const selectUserProductIsLoading = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.isLoading
);
