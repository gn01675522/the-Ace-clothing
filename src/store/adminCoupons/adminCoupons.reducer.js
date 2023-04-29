import { ADMIN_COUPONS_ACTION_TYPES } from "./adminCoupons.types";

const {
  FETCH_ADMIN_COUPONS_START,
  FETCH_ADMIN_COUPONS_SUCCESS,
  FETCH_ADMIN_COUPONS_FAILED,
  SET_ADMIN_COUPONS_START,
  SET_ADMIN_COUPONS_SUCCESS,
  SET_ADMIN_COUPONS_FAILED,
  SET_ADMIN_COUPONS_IS_OPEN,
  SET_ADMIN_COUPONS_TEMP_DATA,
} = ADMIN_COUPONS_ACTION_TYPES;

const INITIAL_STATE = {
  coupons: [],
  pagination: {},
  tempData: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminCouponsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ADMIN_COUPONS_START:
    case SET_ADMIN_COUPONS_START:
      return { ...state, isLoading: true };
    case FETCH_ADMIN_COUPONS_SUCCESS:
      return {
        ...state,
        coupons: payload.coupons,
        pagination: payload.pagination,
        isLoading: false,
      };
    case SET_ADMIN_COUPONS_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false };
    case FETCH_ADMIN_COUPONS_FAILED:
      return { ...state, error: payload, isLoading: false };
    case SET_ADMIN_COUPONS_FAILED:
      return { ...state, error: payload, isModalOpen: false, isLoading: false };
    case SET_ADMIN_COUPONS_IS_OPEN:
      return { ...state, isModalOpen: payload };
    case SET_ADMIN_COUPONS_TEMP_DATA:
      return { ...state, tempData: payload };
    default:
      return state;
  }
};
