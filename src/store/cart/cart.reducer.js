import { CART_ACTION_TYPES } from "./cart.types";

const {
  FETCH_CART_ITEMS_START,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAILED,
  ADD_CART_ITEMS_START,
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_FAILED,
} = CART_ACTION_TYPES;

const INITIAL_STATE = {
  cartItems: [],
  error: null,
  isLoading: false,
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CART_ITEMS_START:
    case ADD_CART_ITEMS_START:
      return { ...state, isLoading: true };
    case FETCH_CART_ITEMS_SUCCESS:
      return { ...state, cartItems: payload, isLoading: false };
    case ADD_CART_ITEMS_SUCCESS:
      return { ...state, isLoading: false };
    case FETCH_CART_ITEMS_FAILED:
    case ADD_CART_ITEMS_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
