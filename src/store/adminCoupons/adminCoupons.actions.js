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
      dispatch(fetchAdminCouponsFailed(error));
    }
  };
};

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
      dispatch(setAdminCouponsFailed(error));
      dispatch(setHandleMessage("error", error));
    }
  };
};

export const createAdminCouponAsync = (data) => {
  return async (dispatch) => {
    dispatch(setAdminCouponsStart());
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`,
        {
          data,
        }
      );
      dispatch(setAdminCouponsSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setAdminCouponsFailed(error));
      dispatch(setHandleMessage("error", error));
    }
  };
};

export const updateAdminCouponAsync = (data) => {
  return async (dispatch) => {
    dispatch(setAdminCouponsStart());
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${data.id}`,
        {
          data,
        }
      );
      dispatch(setAdminCouponsSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setAdminCouponsFailed(error));
      dispatch(setHandleMessage("error", error));
    }
  };
};
