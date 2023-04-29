import { USER_ORDER_ACTION_TYPES } from "./userOrder.types";

const { SET_USER_ORDER_START, SET_USER_ORDER_SUCCESS, SET_USER_ORDER_FAILED } =
  USER_ORDER_ACTION_TYPES;

const INITIAL_STATE = {
  orderId: null,
  actionSate: null,
  error: null,
  isLoading: false,
};

export const userOrderReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_ORDER_START:
      return { ...state, actionState: "start", isLoading: true };
    case SET_USER_ORDER_SUCCESS:
      return {
        ...state,
        orderId: payload,
        actionState: "success",
        isLoading: false,
      };
    case SET_USER_ORDER_FAILED:
      return { ...state, actionState: "error", isLoading: false };
    default:
      return state;
  }
};
