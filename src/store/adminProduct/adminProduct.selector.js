import { createSelector } from "@reduxjs/toolkit";

const selectAdminProductReducer = (state) => state.adminProduct;

export const selectAdminProducts = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => Object.values(adminProduct.products)
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

//* *************************************************************** */
export const selectAdminMensProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "mens")
);

export const selectAdminWomensProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "womens")
);

export const selectAdminHatsProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "hats")
);

export const selectAdminShoesProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "shoes")
);

export const selectAdminAcessoriesProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter(
      (product) => product.category.split("-")[0] === "accessories"
    )
);
