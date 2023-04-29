import { USER_ORDER_ACTION_TYPES } from "./userOrder.types";

const { SET_USER_ORDER_START, SET_USER_ORDER_SUCCESS, SET_USER_ORDER_FAILED } =
  USER_ORDER_ACTION_TYPES;

const INITIAL_STATE = {
  orderId: null,
  error: null,
  isLoading: false,
};

export const userOrderReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_ORDER_START:
      return { ...state, isLoading: true };

    case SET_USER_ORDER_SUCCESS:
      return {
        ...state,
        orderId: payload,
        isLoading: false,
      };

    case SET_USER_ORDER_FAILED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
