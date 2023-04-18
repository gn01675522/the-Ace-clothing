import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { ADMIN_COUPONS_ACTION_TYPES } from "./adminCoupons.types";

const {
  FETCH_ADMIN_COUPONS_START,
  FETCH_ADMIN_COUPONS_SUCCESS,
  FETCH_ADMIN_COUPONS_FAILED,
} = ADMIN_COUPONS_ACTION_TYPES;

export const fetchAdminCouponsStart = () =>
  createAction(FETCH_ADMIN_COUPONS_START);

export const fetchAdminCouponsSuccess = (data) =>
  createAction(FETCH_ADMIN_COUPONS_SUCCESS, data);

export const fetchAdminCouponsFailed = (error) =>
  createAction(FETCH_ADMIN_COUPONS_FAILED, error);

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
      console.log(error);
    }
  };
};
