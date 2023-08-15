import { createSelector } from "@reduxjs/toolkit";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartIsLoading = createSelector(
  [selectCartReducer],
  (cart) => cart.isLoading
);

export const selectCartLoadingItems = createSelector(
  [selectCartReducer],
  (cart) => cart.loadingItems
);

export const selectCartModalOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isModalOpen
);

export const selectCartTempData = createSelector(
  [selectCartReducer],
  (cart) => cart.tempData
);

export const selectCartItemsQuantity = createSelector(
  [selectCartItems],
  (cartItems) => cartItems?.carts?.length
);
