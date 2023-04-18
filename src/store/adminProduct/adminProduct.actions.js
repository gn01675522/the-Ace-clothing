import axios from "axios";

import { createAction } from "../../utils/reducer/reducer.utils";
import { ADMIN_PRODUCT_ACTION_TYPES } from "./adminProduct.types";

const {
  FETCH_ADMIN_PRODUCT_START,
  FETCH_ADMIN_PRODUCT_SUCCESS,
  FETCH_ADMIN_PRODUCT_FAILED,
  DELETE_ADMIN_PRODUCT_START,
  DELETE_ADMIN_PRODUCT_SUCCESS,
  DELETE_ADMIN_PRODUCT_FAILED,
  SET_ADMIN_PRODUCT_IS_OPEN,
} = ADMIN_PRODUCT_ACTION_TYPES;

export const fetchAdminProductStart = () =>
  createAction(FETCH_ADMIN_PRODUCT_START);

export const fetchAdminProductSuccess = (data) =>
  createAction(FETCH_ADMIN_PRODUCT_SUCCESS, data);

export const fetchAdminProductFailed = (error) =>
  createAction(FETCH_ADMIN_PRODUCT_FAILED, error);

export const deleteAdminProductStart = () =>
  createAction(DELETE_ADMIN_PRODUCT_START);

export const deleteAdminProductSuccess = (res) =>
  createAction(DELETE_ADMIN_PRODUCT_SUCCESS);

export const deleteAdminProductFailed = (error) =>
  createAction(DELETE_ADMIN_PRODUCT_FAILED, error);

export const setAdminProductModalOpen = (bool) =>
  createAction(SET_ADMIN_PRODUCT_IS_OPEN, bool);

export const fetchAdminProductAsync = (page = 1) => {
  return async (dispatch) => {
    dispatch(fetchAdminProductStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
      );
      dispatch(
        fetchAdminProductSuccess({
          products: res.data.products,
          pagination: res.data.pagination,
        })
      );
      if (res.data.success) {
        dispatch(setAdminProductModalOpen(false));
      }
      console.log(res.data);
    } catch (error) {
      dispatch(fetchAdminProductFailed(error));
    }
  };
};
//* fetch api 的 product data

export const deleteAdminProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminProductStart());
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      console.log(res.data);
      dispatch(deleteAdminProductSuccess(res.data.success));
      dispatch(fetchAdminProductAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      console.log(error);
      dispatch(deleteAdminProductFailed(error));
    }
  };
};
//* delete products actions function
