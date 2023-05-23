// 此 redux 與其他 redux 有 action 上的交互：
// 1. adminProduct

import { ADMIN_PRODUCT_ACTION_TYPES } from "./adminProduct.types";

const {
  FETCH_ADMIN_PRODUCT_START,
  FETCH_ADMIN_PRODUCT_SUCCESS,
  FETCH_ADMIN_PRODUCT_FAILED,
  SET_ADMIN_PRODUCT_START,
  SET_ADMIN_PRODUCT_SUCCESS,
  SET_ADMIN_PRODUCT_FAILED,
  SET_ADMIN_PRODUCT_IS_OPEN,
  SET_ADMIN_PRODUCT_TEMP_DATA,
} = ADMIN_PRODUCT_ACTION_TYPES;

const INITIAL_STATE = {
  products: [],
  tempData: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminProductReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ADMIN_PRODUCT_START:
    case SET_ADMIN_PRODUCT_START:
      return { ...state, isLoading: true };

    case FETCH_ADMIN_PRODUCT_SUCCESS:
      return { ...state, products: payload.products, isLoading: false };

    case FETCH_ADMIN_PRODUCT_FAILED:
      return { ...state, isLoading: false, error: payload };

    case SET_ADMIN_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false };

    case SET_ADMIN_PRODUCT_FAILED:
      return { ...state, isLoading: false, error: payload };

    case SET_ADMIN_PRODUCT_TEMP_DATA:
      return { ...state, tempData: payload };

    case SET_ADMIN_PRODUCT_IS_OPEN:
      return { ...state, isModalOpen: payload };

    default:
      return state;
  }
};
