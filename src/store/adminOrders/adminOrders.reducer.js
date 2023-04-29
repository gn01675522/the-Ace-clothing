import { ADMIN_ORDERS_ACTION_TYPES } from "./adminOrders.types";

const {
  FETCH_ADMIN_ORDERS_START,
  FETCH_ADMIN_ORDERS_SUCCESS,
  FETCH_ADMIN_ORDERS_FAILED,
  SET_ADMIN_ORDERS_START,
  SET_ADMIN_ORDERS_SUCCESS,
  SET_ADMIN_ORDERS_FAILED,
  SET_ADMIN_ORDERS_MODAL_OPEN,
  SET_ADMIN_ORDERS_TEMP_DATA,
} = ADMIN_ORDERS_ACTION_TYPES;

const INITIAL_STATE = {
  orders: [],
  pagination: {},
  tempData: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
};

export const adminOrdersReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ADMIN_ORDERS_START:
    case SET_ADMIN_ORDERS_START:
      return { ...state, isLoading: true };

    case FETCH_ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders,
        pagination: payload.pagination,
        isLoading: false,
      };

    case FETCH_ADMIN_ORDERS_FAILED:
      return { ...state, isLoading: false, error: payload };

    case SET_ADMIN_ORDERS_SUCCESS:
      return { ...state, isModalOpen: false, isLoading: false };

    case SET_ADMIN_ORDERS_FAILED:
      return { ...state, error: payload, isLoading: false, isModalOpen: false };

    case SET_ADMIN_ORDERS_MODAL_OPEN:
      return { ...state, isModalOpen: payload };

    case SET_ADMIN_ORDERS_TEMP_DATA:
      return { ...state, tempData: payload };

    default:
      return state;
  }
};
