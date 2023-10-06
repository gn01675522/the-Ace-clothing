import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import {
  GET_ADMIN_COUPONS,
  DELETE_ADMIN_COUPONS,
  POST_ADMIN_COUPONS,
  PUT_ADMIN_COUPONS,
} from "../../config/api_adminCoupons";

//********** Helper **********
const formatDataHelper = (formData, date) => {
  const time = date.getTime();
  const newFormData = { ...formData, due_date: time };
  return newFormData;
};
//* 這個 helper 會在每次操作 api 時候 (新增、更新)，把資料帶來此處來進行處理，主要目標為時間格式轉換

//********** Helper **********

export const fetchAdminCouponsAsync = createAsyncThunk(
  "adminCoupons/fetchAdminCoupons",
  async (page = 1) => {
    try {
      const res = await axios.get(GET_ADMIN_COUPONS(page));
      return { coupons: res.data.coupons, pagination: res.data.pagination };
    } catch (error) {
      return error.response.data;
    }
  }
);
//* 擷取 api 上關於 admin coupons 的資料

export const deleteAdminCouponsAsync = createAsyncThunk(
  "adminCoupons/deleteAdminCoupons",
  async (id, { dispatch }) => {
    try {
      const res = await axios.delete(DELETE_ADMIN_COUPONS(id));
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 刪除 api 上關於 admin coupons 的資料

export const createAdminCouponAsync = createAsyncThunk(
  "adminCoupons/createAdminCoupons",
  async ({ formData, date }, { dispatch }) => {
    const newFormData = formatDataHelper(formData, date);
    try {
      const res = await axios.post(POST_ADMIN_COUPONS(), {
        data: newFormData,
      });
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 創造 admin coupons 資料

export const updateAdminCouponAsync = createAsyncThunk(
  "adminCoupons/updateAdminCoupons",
  async ({ formData, date }, { dispatch }) => {
    const newFormData = formatDataHelper(formData, date);
    try {
      const res = await axios.put(PUT_ADMIN_COUPONS(newFormData.id), {
        data: newFormData,
      });
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 更新 api 上關於 admin coupons 的資料
