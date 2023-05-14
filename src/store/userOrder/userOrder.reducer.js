import { USER_ORDER_ACTION_TYPES } from "./userOrder.types";

const {
  SET_USER_ORDER_START,
  SET_USER_ORDER_SUCCESS,
  SET_USER_ORDER_FAILED,
  FETCH_USER_ORDER_DATA_START,
  FETCH_USER_ORDER_DATA_SUCCESS,
  FETCH_USER_ORDER_DATA_FAILED,
  SET_CLEAR_USER_ORDER_STATE,
} = USER_ORDER_ACTION_TYPES;

const INITIAL_STATE = {
  orderData: {},
  orderId: null,
  error: null,
  isLoading: false,
};

export const userOrderReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_ORDER_START:
    case FETCH_USER_ORDER_DATA_START:
      return { ...state, isLoading: true };

    case SET_USER_ORDER_SUCCESS:
      return {
        ...state,
        orderId: payload,
        isLoading: false,
      };

    case FETCH_USER_ORDER_DATA_SUCCESS:
      return {
        ...state,
        orderData: payload,
        isLoading: false,
      };

    case SET_USER_ORDER_FAILED:
    case FETCH_USER_ORDER_DATA_FAILED:
      return { ...state, isLoading: false };

    case SET_CLEAR_USER_ORDER_STATE:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
