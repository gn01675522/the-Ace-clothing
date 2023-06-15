import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_PRODUCT_ACTION_TYPES } from "./userProducts.types";

const {
  FETCH_USER_PRODUCT_START,
  FETCH_USER_PRODUCT_SUCCESS,
  FETCH_USER_PRODUCT_FAILED,
  FETCH_USER_SINGLE_PRODUCT_START,
  FETCH_USER_SINGLE_PRODUCT_SUCCESS,
  FETCH_USER_SINGLE_PRODUCT_FAILED,
} = USER_PRODUCT_ACTION_TYPES;

export const fetchUserProductStart = () =>
  createAction(FETCH_USER_PRODUCT_START);

export const fetchUserProductSuccess = (data) =>
  createAction(FETCH_USER_PRODUCT_SUCCESS, data);

export const fetchUserProductFailed = (error) =>
  createAction(FETCH_USER_PRODUCT_FAILED, error);

export const fetchUserSingleProductStart = () =>
  createAction(FETCH_USER_SINGLE_PRODUCT_START);

export const fetchUserSingleProductSuccess = (data) =>
  createAction(FETCH_USER_SINGLE_PRODUCT_SUCCESS, data);

export const fetchUserSingleProductFailed = (error) =>
  createAction(FETCH_USER_SINGLE_PRODUCT_FAILED, error);

//******************************** Sync **********************************************/
//******************************** Async **********************************************/

export const fetchUserProductAsync = () => {
  return async (dispatch) => {
    dispatch(fetchUserProductStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      dispatch(fetchUserProductSuccess(res.data.products));
    } catch (error) {
      dispatch(fetchUserProductFailed(error.response.data));
    }
  };
};
//* 取得 api 裡面全部的產品資訊

export const fetchUserSingleProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(fetchUserSingleProductStart());
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      dispatch(fetchUserSingleProductSuccess(productRes.data.product));
    } catch (error) {
      dispatch(fetchUserSingleProductFailed(error.response.data));
    }
  };
};
//* 讓 api 根據我們傳入的 id 來找到我們要的產品
