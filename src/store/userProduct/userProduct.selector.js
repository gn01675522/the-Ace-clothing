import { createSelector } from "@reduxjs/toolkit";

const selectUserProductReducer = (state) => state.userProduct;

export const selectUserProduct = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.products
);

// export const selectUserProductPagination = createSelector(
//   [selectUserProductReducer],
//   (userProduct) => userProduct.pagination
// );

export const selectUserProductIsLoading = createSelector(
  [selectUserProductReducer],
  (userProduct) => userProduct.isLoading
);
//* 與 api 交互時的 loading 狀態

export const selectUserProductPagination = createSelector(
  [selectUserProduct],
  (products) => Math.ceil(products.length / 12)
);
//* 根據產品數量除以 12 來決定分頁器數量 (全部商品)

export const selectUserProductMens = createSelector(
  [selectUserProduct],
  (products) => {
    const filterData = products.filter((product) => {
      return product.category.split("-")[0] === "mens";
    });
    return filterData;
  }
);
//* 將產品列表裡面的男性商品取出

export const selectUserProductIsWomens = createSelector(
  [selectUserProduct],
  (products) => {
    const filterData = products.filter((product) => {
      return product.category.split("-")[0] === "womens";
    });
    return filterData;
  }
);
//* 將產品列表裡面的女性商品取出

export const selectUserProductHats = createSelector(
  [selectUserProduct],
  (products) => {
    const filterData = products.filter((product) => {
      return product.category.split("-")[0] === "hats";
    });
    return filterData;
  }
);

export const selectUserProductShoes = createSelector(
  [selectUserProduct],
  (products) => {
    const filterData = products.filter((product) => {
      return product.category.split("-")[0] === "shoes";
    });
    return filterData;
  }
);
//* 將產品列表裡面的帽子商品取出

export const selectUserProductAcessories = createSelector(
  [selectUserProduct],
  (products) => {
    const filterData = products.filter((product) => {
      return product.category.split("-")[0] === "acessories";
    });
    return filterData;
  }
);
//* 將產品列表裡面的飾品商品取出
