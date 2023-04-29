import { createSelector } from "@reduxjs/toolkit";

const selectAdminCouponsReducer = (state) => state.adminCoupons;

export const selectAdminCoupons = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupons) => adminCoupons.coupons
);

export const selectAdminCouponsPagination = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupons) => adminCoupons.pagination
);

export const selectAdminCouponsIsLoading = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupons) => adminCoupons.isLoading
);

export const selectAdminCouponsIsModalOpen = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupons) => adminCoupons.isModalOpen
);

export const selectAdminCouponsTempData = createSelector(
  [selectAdminCouponsReducer],
  (adminCoupons) => adminCoupons.tempData
);
