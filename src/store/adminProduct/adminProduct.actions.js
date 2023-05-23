import axios from "axios";

import { createAction } from "../../utils/reducer/reducer.utils";
import { ADMIN_PRODUCT_ACTION_TYPES } from "./adminProduct.types";

import { setHandleMessage } from "../message/message.actions";

const {
  FETCH_ADMIN_PRODUCT_START,
  FETCH_ADMIN_PRODUCT_SUCCESS,
  FETCH_ADMIN_PRODUCT_FAILED,
  SET_ADMIN_PRODUCT_START,
  SET_ADMIN_PRODUCT_SUCCESS,
  SET_ADMIN_PRODUCT_FAILED,
  SET_ADMIN_PRODUCT_IS_OPEN,
  SET_ADMIN_PRODUCT_TEMP_DATA,
} = ADMIN_PRODUCT_ACTION_TYPES;

const cleanedDataHelper = (formData) => {
  const cleanImagesArray = formData.imagesUrl.filter((url) => url !== "");
  const cleanedData = { ...formData, imagesUrl: cleanImagesArray };
  return cleanedData;
};
//******************************** Helper **********************************************/
//******************************** Sync **********************************************/

export const fetchAdminProductStart = () =>
  createAction(FETCH_ADMIN_PRODUCT_START);

export const fetchAdminProductSuccess = (data) =>
  createAction(FETCH_ADMIN_PRODUCT_SUCCESS, data);

export const fetchAdminProductFailed = (error) =>
  createAction(FETCH_ADMIN_PRODUCT_FAILED, error);

export const setAdminProductStart = () => createAction(SET_ADMIN_PRODUCT_START);

export const setAdminProductSuccess = () =>
  createAction(SET_ADMIN_PRODUCT_SUCCESS);

export const setAdminProductFailed = (error) =>
  createAction(SET_ADMIN_PRODUCT_FAILED, error);

export const setAdminProductTempData = (data) =>
  createAction(SET_ADMIN_PRODUCT_TEMP_DATA, data);

export const setAdminProductModalOpen = (bool) =>
  createAction(SET_ADMIN_PRODUCT_IS_OPEN, bool);

//******************************** Sync **********************************************/
//******************************** Async **********************************************/

// export const fetchAdminProductAsync = (page = 1) => {
//   return async (dispatch) => {
//     dispatch(fetchAdminProductStart());
//     try {
//       const res = await axios.get(
//         `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
//       );
//       dispatch(
//         fetchAdminProductSuccess({
//           products: res.data.products,
//           pagination: res.data.pagination,
//         })
//       );
//     } catch (error) {
//       dispatch(fetchAdminProductFailed(error.response.data));
//     }
//   };
// };
// //* 取得 product data action

export const fetchAdminProductAsync = () => {
  return async (dispatch) => {
    dispatch(fetchAdminProductStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
      );
      console.log(res.data.products);
      dispatch(
        fetchAdminProductSuccess({
          products: res.data.products,
        })
      );
    } catch (error) {
      dispatch(fetchAdminProductFailed(error.response.data));
    }
  };
};
//* 取得 product data action

export const deleteAdminProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(setAdminProductStart());
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      dispatch(setAdminProductSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminProductAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setAdminProductFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 刪除 products data action

export const updateAdminProductAsync = (id, data) => {
  const newFormData = cleanedDataHelper(data);
  return async (dispatch) => {
    dispatch(setAdminProductStart());
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`,
        {
          data: newFormData,
        }
      );
      dispatch(setAdminProductSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminProductAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setAdminProductFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 更新 products data action

export const createAdminProductAsync = (data) => {
  const newFormData = cleanedDataHelper(data);
  return async (dispatch) => {
    dispatch(setAdminProductStart());
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`,
        {
          data: newFormData,
        }
      );
      dispatch(setAdminProductSuccess());
      dispatch(setHandleMessage("success", res));
      dispatch(fetchAdminProductAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setAdminProductFailed(error.response.data));
      dispatch(setHandleMessage("error", error));
    }
  };
};
//* 新增 products data action
