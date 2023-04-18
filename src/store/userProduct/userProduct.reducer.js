import { USER_PRODUCT_ACTION_TYPES } from "./userProducts.types";

const {
  FETCH_USER_PRODUCT_START,
  FETCH_USER_PRODUCT_SUCCESS,
  FETCH_USER_PRODUCT_FAILED,
} = USER_PRODUCT_ACTION_TYPES;

const INITIAL_STATE = {
  products: [],
  pagination: {},
  error: null,
  isLoading: false,
};

export const userProductReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER_PRODUCT_START:
      return { ...state, isLoading: true };
    case FETCH_USER_PRODUCT_SUCCESS:
      return {
        ...state,
        products: payload.products,
        pagination: payload.pagination,
        isLoading: false,
      };
    case FETCH_USER_PRODUCT_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
