import { ADMIN_PRODUCT_ACTION_TYPES } from "./adminProduct.types";

const {
  FETCH_ADMIN_PRODUCT_START,
  FETCH_ADMIN_PRODUCT_SUCCESS,
  FETCH_ADMIN_PRODUCT_FAILED,
  DELETE_ADMIN_PRODUCT_START,
  DELETE_ADMIN_PRODUCT_SUCCESS,
  DELETE_ADMIN_PRODUCT_FAILED,
  SET_ADMIN_PRODUCT_IS_OPEN,
} = ADMIN_PRODUCT_ACTION_TYPES;

const INITIAL_STATE = {
  products: [],
  pagination: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminProductReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ADMIN_PRODUCT_START:
    case DELETE_ADMIN_PRODUCT_START:
      return { ...state, isLoading: true };
    case FETCH_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        products: payload.products,
        pagination: payload.pagination,
        isLoading: false,
      };
    case DELETE_ADMIN_PRODUCT_SUCCESS:
      return { ...state, isLoading: false };
    case FETCH_ADMIN_PRODUCT_FAILED:
    case DELETE_ADMIN_PRODUCT_FAILED:
      return { ...state, error: payload, isLoading: false };
    case SET_ADMIN_PRODUCT_IS_OPEN:
      return { ...state, isModalOpen: payload };
    default:
      return state;
  }
};
