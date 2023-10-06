import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import {
  GET_ADMIN_ORDERS,
  PUT_ADMIN_ORDERS,
  DELETE_ADMIN_ORDERS,
} from "../../config/api_adminOrders";

export const fetchAdminOrdersAsync = createAsyncThunk(
  "adminOrders/fetchAdminOrders",
  async (page = 1) => {
    try {
      const res = await axios.get(GET_ADMIN_ORDERS(page));
      return {
        orders: res.data.orders,
        pagination: res.data.pagination,
      };
    } catch (error) {
      return error.response.data;
    }
  }
);
//* 擷取 admin orders api 中的資料

export const updateAdminOrdersAsync = createAsyncThunk(
  "adminOrders/updateAdminOrders",
  async (data, { dispatch }) => {
    try {
      const res = await axios.put(PUT_ADMIN_ORDERS(data.id), {
        data,
      });
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminOrdersAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 更新 admin orders api 中的資料

export const deleteAdminOrdersAsync = createAsyncThunk(
  "adminOrders/deleteAdminOrders",
  async (id, { dispatch }) => {
    try {
      const res = await axios.delete(DELETE_ADMIN_ORDERS(id));

      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchAdminOrdersAsync());
      //* 刪除完畢後重新 fetch 產品列表
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 刪除 admin orders api 中的資料
