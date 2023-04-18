import { ADMIN_COUPONS_ACTION_TYPES } from "./adminCoupons.types";

const {
  FETCH_ADMIN_COUPONS_START,
  FETCH_ADMIN_COUPONS_SUCCESS,
  FETCH_ADMIN_COUPONS_FAILED,
} = ADMIN_COUPONS_ACTION_TYPES;

const INITIAL_STATE = {
  coupons: [],
  pagination: {},
  error: null,
  isLoading: false,
};

export const adminCouponsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ADMIN_COUPONS_START:
      return { ...state, isLoading: true };
    case FETCH_ADMIN_COUPONS_SUCCESS:
      return {
        ...state,
        coupons: payload.coupons,
        pagination: payload.pagination,
        isLoading: false,
      };
    case FETCH_ADMIN_COUPONS_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
