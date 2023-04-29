import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { ADMIN_COUPONS_ACTION_TYPES } from "./adminCoupons.types";

import { setHandleMessage } from "../message/message.actions";

const {
  FETCH_ADMIN_COUPONS_START,
  FETCH_ADMIN_COUPONS_SUCCESS,
  FETCH_ADMIN_COUPONS_FAILED,
  SET_ADMIN_COUPONS_START,
  SET_ADMIN_COUPONS_SUCCESS,
  SET_ADMIN_COUPONS_FAILED,
  SET_ADMIN_COUPONS_IS_OPEN,
  SET_ADMIN_COUPONS_TEMP_DATA,
} = ADMIN_COUPONS_ACTION_TYPES;

const formatDataHelper = (formData, date) => {
  const time = date.getTime();
  const newFormData = { ...formData, due_date: time };
  return newFormData;
};
//* 這個 helper 會在每次操作 api 時候 (新增、更新)，把資料帶來此處來進行處理，主要目標為時間格式轉換

//******************************** Helper **********************************************/
//******************************** Sync **********************************************/

export const fetchAdminCouponsStart = () =>
  createAction(FETCH_ADMIN_COUPONS_START);

export const fetchAdminCouponsSuccess = (data) =>
  createAction(FETCH_ADMIN_COUPONS_SUCCESS, data);

export const fetchAdminCouponsFailed = (error) =>
  createAction(FETCH_ADMIN_COUPONS_FAILED, error);

export const setAdminCouponsStart = () => createAction(SET_ADMIN_COUPONS_START);

export const setAdminCouponsSuccess = () =>
  createAction(SET_ADMIN_COUPONS_SUCCESS);

export const setAdminCouponsFailed = (error) =>
  createAction(SET_ADMIN_COUPONS_FAILED, error);

export const setAdminCouponsOpen = (bool) =>
  createAction(SET_ADMIN_COUPONS_IS_OPEN, bool);

export const setAdminCouponsTempData = (data) =>
  createAction(SET_ADMIN_COUPONS_TEMP_DATA, data);

//******************************** Sync **********************************************/
//******************************** Async **********************************************/

export const fetchAdminCouponsAsync = (page = 1) => {
  return async (dispatch) => {
    dispatch(fetchAdminCouponsStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
      );
      dispatch(
        fetchAdminCouponsSuccess({
          coupons: res.data.coupons,
          pagination: res.data.pagination,
        })
      );
    } catch (error) {
      dispatch(fetchAdminCouponsFailed(error.response.data));
    }
  };
};
//* 擷取 api 上關於 admin coupons 的資料

export const deleteAdminCouponsAsync = (id) => {
  return async (dispatch) => {
    dispatch(setAdminCouponsStart());
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      dispatch(setAdminCouponsSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setAdminCouponsFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 刪除 api 上關於 admin coupons 的資料

export const createAdminCouponAsync = (formData, date) => {
  const newFormData = formatDataHelper(formData, date);
  return async (dispatch) => {
    dispatch(setAdminCouponsStart());
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`,
        {
          data: newFormData,
        }
      );
      dispatch(setAdminCouponsSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setAdminCouponsFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 創造 admin coupons 資料

export const updateAdminCouponAsync = (formData, date) => {
  const newFormData = formatDataHelper(formData, date);
  return async (dispatch) => {
    dispatch(setAdminCouponsStart());
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${newFormData.id}`,
        {
          data: newFormData,
        }
      );
      dispatch(setAdminCouponsSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setAdminCouponsFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 更新 api 上關於 admin coupons 的資料
