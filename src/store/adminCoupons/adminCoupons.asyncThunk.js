import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

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
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
      );
      console.log("inside adminCoupons", res.data.coupons)
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
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
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
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`,
        {
          data: newFormData,
        }
      );
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
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${newFormData.id}`,
        {
          data: newFormData,
        }
      );
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminCouponsAsync());
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 更新 api 上關於 admin coupons 的資料
