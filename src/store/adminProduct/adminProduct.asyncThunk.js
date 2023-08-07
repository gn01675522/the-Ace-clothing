import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

const cleanedDataHelper = (formData) => {
  const cleanImagesArray = formData.imagesUrl.filter((url) => url !== "");
  const cleanedData = { ...formData, imagesUrl: cleanImagesArray };
  return cleanedData;
};

export const fetchAdminProductAsync = createAsyncThunk(
  "adminProduct/fetchAdminProduct",
  async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
      );
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
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
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
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`,
        {
          data: newFormData,
        }
      );
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
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`,
        {
          data: newFormData,
        }
      );
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
