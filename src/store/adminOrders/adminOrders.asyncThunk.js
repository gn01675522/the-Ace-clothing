import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

export const fetchAdminOrdersAsync = createAsyncThunk(
  "adminOrders/fetchAdminOrders",
  async (page = 1) => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
      );
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
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${data.id}`,
        {
          data,
        }
      );
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
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
      );

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
