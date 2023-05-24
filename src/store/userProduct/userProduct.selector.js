import { createSelector } from "@reduxjs/toolkit";

const selectUserProductReducer = (state) => state.userProduct;

export const selectUserProducts = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.products
);
//* 取得全部產品

export const selectUserProductIsLoading = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.isLoading
);
//* 與 api 交互時的 loading 狀態

// export const selectUserProductPagination = createSelector(
//   [selectUserProducts],
//   (products) => Math.ceil(products.length / 12)
// );
//* 根據產品數量除以 12 來決定分頁器數量 (全部商品)

//* ******************************************* */
export const selectUserMensProducts = createSelector(
  [selectUserProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "mens")
);
//* 將產品列表裡面的男性商品取出

export const selectUserWomensProducts = createSelector(
  [selectUserProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "womens")
);
//* 將產品列表裡面的女性商品取出

export const selectUserHatsProducts = createSelector(
  [selectUserProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "hats")
);

export const selectUserShoesProducts = createSelector(
  [selectUserProducts],
  (products) =>
    products.filter((product) => product.category.split("-")[0] === "shoes")
);
//* 將產品列表裡面的帽子商品取出

export const selectUserAcessoriesProducts = createSelector(
  [selectUserProducts],
  (products) =>
    products.filter(
      (product) => product.category.split("-")[0] === "acessories"
    )
);
//* 將產品列表裡面的飾品商品取出
