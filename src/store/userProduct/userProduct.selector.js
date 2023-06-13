import { createSelector } from "@reduxjs/toolkit";

const selectUserProductReducer = (state) => state.userProduct;

export const selectUserProducts = createSelector(
  [selectUserProductReducer],
  (userProduct) =>
    [...userProduct.products].sort((a, b) =>
      a.category.localeCompare(b.category)
    )
);
//* 取得全部產品

export const selectUserProduct = (id) => createSelector(
  [selectUserProducts],
  (userProduct) =>
    userProduct.products.filter((product) => (product.id === id))
);
//* 取得全部產品

export const selectUserProductIsLoading = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.isLoading
);
//* 與 api 交互時的 loading 狀態

const classifyUserProducts = (category) =>
  createSelector([selectUserProducts], (products) =>
    products.filter((product) => product.category.split("-")[0] === category)
  );

//* ****************************** 以下為業務邏輯 ********************************* */
export const selectUserMensProducts = classifyUserProducts("mens");
//* 將產品列表裡面的男性商品取出

export const selectUserWomensProducts = classifyUserProducts("womens");
//* 將產品列表裡面的女性商品取出

export const selectUserHatsProducts = classifyUserProducts("hats");

export const selectUserShoesProducts = classifyUserProducts("shoes");
//* 將產品列表裡面的帽子商品取出

export const selectUserAccessoriesProducts =
  classifyUserProducts("accessories");
//* 將產品列表裡面的飾品商品取出
