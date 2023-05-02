import { CART_ACTION_TYPES } from "./cart.types";

const {
  FETCH_CART_ITEMS_START,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAILED,
  SET_CART_ITEMS_START,
  SET_CART_ITEMS_SUCCESS,
  SET_CART_ITEMS_FAILED,
  SET_CART_ITEMS_UPDATE_START,
  SET_CART_ITEMS_UPDATE_SUCCESS,
  SET_CART_ITEMS_UPDATE_FAILED,
} = CART_ACTION_TYPES;

const INITIAL_STATE = {
  cartItems: [],
  loadingItems: [],
  error: null,
  isLoading: false,
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CART_ITEMS_START:
    case SET_CART_ITEMS_START:
      return { ...state, isLoading: true };

    case FETCH_CART_ITEMS_SUCCESS:
      return { ...state, cartItems: payload, isLoading: false };

    case SET_CART_ITEMS_UPDATE_START:
      return { ...state, loadingItems: payload, isLoading: true };

    case SET_CART_ITEMS_UPDATE_SUCCESS:
      return { ...state, loadingItems: [], isLoading: false };
    //* 之所以 loadingItems 會使用空陣列是因為原先的防呆方法會在快速調整兩個商品的時候造成其中一個商品 select 被永久 disabled

    case SET_CART_ITEMS_SUCCESS:
      return { ...state, isLoading: false };

    case FETCH_CART_ITEMS_FAILED:
    case SET_CART_ITEMS_FAILED:
    case SET_CART_ITEMS_UPDATE_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
