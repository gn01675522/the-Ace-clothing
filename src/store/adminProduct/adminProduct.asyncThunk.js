import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import {
  GET_ADMIN_PRODUCT_ALL,
  DELETE_ADMIN_PRODUCT,
  PUT_ADMIN_PRODUCT,
  POST_ADMIN_PRODUCT,
} from "../../config/api_adminProduct";

//********** Helper **********
const cleanedDataHelper = (formData) => {
  const cleanImagesArray = formData.imagesUrl.filter((url) => url !== "");
  const cleanedData = { ...formData, imagesUrl: cleanImagesArray };
  return cleanedData;
};
//********** Helper **********

export const fetchAdminProductAsync = createAsyncThunk(
  "adminProduct/fetchAdminProduct",
  async () => {
    try {
      const res = await axios.get(GET_ADMIN_PRODUCT_ALL());
      return { products: res.data.products };
    } catch (error) {
      return error.response.data;
    }
  }
);
//* 取得 product data action

export const deleteAdminProductAsync = createAsyncThunk(
  "adminProduct/deleteAdminProduct",
  async (id, { dispatch }) => {
    try {
      const res = await axios.delete(DELETE_ADMIN_PRODUCT(id));
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminProductAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 刪除 products data action

export const updateAdminProductAsync = createAsyncThunk(
  "adminProduct/updateAdminProduct",
  async ({ id, formData }, { dispatch }) => {
    const newFormData = cleanedDataHelper(formData);
    try {
      const res = await axios.put(PUT_ADMIN_PRODUCT(id), {
        data: newFormData,
      });
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminProductAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 更新 products data action

export const createAdminProductAsync = createAsyncThunk(
  "adminProduct/createAdminProduct",
  async (data, { dispatch }) => {
    const newFormData = cleanedDataHelper(data);
    try {
      const res = await axios.post(POST_ADMIN_PRODUCT(), {
        data: newFormData,
      });
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminProductAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 新增 products data action
