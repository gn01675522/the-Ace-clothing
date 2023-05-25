import { createSelector } from "@reduxjs/toolkit";

const selectAdminProductReducer = (state) => state.adminProduct;

export const selectAdminProducts = createSelector(
  [selectAdminProductReducer],
  (adminProduct) =>
    Object.values(adminProduct.products).sort((a, b) =>
      a.category.localeCompare(b.category)
    )
);
//* 取出完整產品資料，並做初步排序

export const selectAdminProductIsLoading = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.isLoading
);
//* 取出讀取狀態

export const selectAdminProductTempData = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.tempData
);
//* 取出暫存資料

export const selectAdminProductIsModalOpen = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.isModalOpen
);
//* 取出 modal 開啟狀態

export const selectAdminProductError = createSelector(
  [selectAdminProductReducer],
  (adminProduct) => adminProduct.error
);
//* 取出 error 訊息

//* ****************************** 以下為業務邏輯 ********************************* */
export const selectAdminMensProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "mens")
);
//* 就取出的完整產品資料將 mens 分類出來

export const selectAdminWomensProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "womens")
);
//* 就取出的完整產品資料將 womens 分類出來

export const selectAdminHatsProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "hats")
);
//* 就取出的完整產品資料將 hats 分類出來

export const selectAdminShoesProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "shoes")
);
//* 就取出的完整產品資料將 shoes 分類出來

export const selectAdminAcessoriesProducts = createSelector(
  [selectAdminProducts],
  (products) =>
    products.filter(
      (product) => product.category.split("-")[0] === "accessories"
    )
);
//* 就取出的完整產品資料將 acessories 分類出來
