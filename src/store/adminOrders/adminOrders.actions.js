import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";

import { ADMIN_ORDERS_ACTION_TYPES } from "./adminOrders.types";

const {
  FETCH_ADMIN_ORDERS_START,
  FETCH_ADMIN_ORDERS_SUCCESS,
  FETCH_ADMIN_ORDERS_FAILED,
} = ADMIN_ORDERS_ACTION_TYPES;

export const fetchAdminOrdersStart = () =>
  createAction(FETCH_ADMIN_ORDERS_START);

export const fetchAdminOrdersSuccess = (data) =>
  createAction(FETCH_ADMIN_ORDERS_SUCCESS, data);

export const fetchAdminOrdersFailed = (error) =>
  createAction(FETCH_ADMIN_ORDERS_FAILED, error);

export const fetchAdminOrdersAsync = (page = 1) => {
  return async (dispatch) => {
    dispatch(fetchAdminOrdersStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
      );
      console.log(res);
      dispatch(
        fetchAdminOrdersSuccess({
          orders: res.data.orders,
          pagination: res.data.pagination,
        })
      );
    } catch (error) {
      dispatch(fetchAdminOrdersFailed());
    }
  };
};
