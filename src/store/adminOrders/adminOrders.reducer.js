import { ADMIN_ORDERS_ACTION_TYPES } from "./adminOrders.types";

const {
  FETCH_ADMIN_ORDERS_START,
  FETCH_ADMIN_ORDERS_SUCCESS,
  FETCH_ADMIN_ORDERS_FAILED,
} = ADMIN_ORDERS_ACTION_TYPES;

const INITIAL_STATE = {
  orders: [],
  pagination: {},
  error: null,
  isLoading: false,
};

export const adminOrdersReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ADMIN_ORDERS_START:
      return { ...state, isLoading: true };
    case FETCH_ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders,
        pagination: payload.pagination,
        isLoading: true,
      };
    case FETCH_ADMIN_ORDERS_FAILED:
      return { ...state, error: payload, isLoading: true };
    default:
      return state;
  }
};
