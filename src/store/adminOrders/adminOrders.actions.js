import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";

import { setHandleMessage } from "../message/message.actions";

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

export const fetchAdminOrdersStart = () =>
  createAction(FETCH_ADMIN_ORDERS_START);

export const fetchAdminOrdersSuccess = (data) =>
  createAction(FETCH_ADMIN_ORDERS_SUCCESS, data);

export const fetchAdminOrdersFailed = (error) =>
  createAction(FETCH_ADMIN_ORDERS_FAILED, error);

export const setAdminOrdersStart = () => createAction(SET_ADMIN_ORDERS_START);

export const setAdminOrdersSuccess = () =>
  createAction(SET_ADMIN_ORDERS_SUCCESS);

export const setAdminOrdersFailed = (error) =>
  createAction(SET_ADMIN_ORDERS_FAILED, error);

export const setAdminOrdersIsModalOpen = (bool) =>
  createAction(SET_ADMIN_ORDERS_MODAL_OPEN, bool);

export const setAdminOrdersTempData = (data) =>
  createAction(SET_ADMIN_ORDERS_TEMP_DATA, data);

//******************************** Sync **********************************************/
//******************************** Async **********************************************/

export const fetchAdminOrdersAsync = (page = 1) => {
  return async (dispatch) => {
    dispatch(fetchAdminOrdersStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
      );
      dispatch(
        fetchAdminOrdersSuccess({
          orders: res.data.orders,
          pagination: res.data.pagination,
        })
      );
    } catch (error) {
      dispatch(fetchAdminOrdersFailed(error.response.data));
    }
  };
};
//* 擷取 admin orders api 中的資料

export const updateAdminOrdersAsync = (data) => {
  return async (dispatch) => {
    dispatch(setAdminOrdersStart());
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${data.id}`,
        {
          data,
        }
      );
      dispatch(setAdminOrdersSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminOrdersAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setAdminOrdersFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 更新 admin orders api 中的資料

export const deleteAdminOrdersAsync = (data) => {
  return async (dispatch) => {
    dispatch(setAdminOrdersStart());
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${data.id}`,
        {
          data,
        }
      );
      dispatch(setAdminOrdersSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminOrdersAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setAdminOrdersFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 刪除 admin orders api 中的資料
