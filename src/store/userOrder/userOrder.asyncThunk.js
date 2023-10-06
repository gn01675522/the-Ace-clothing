import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  POST_USER_ORDER,
  GET_USER_ORDER,
  GET_USER_ORDER_WITH_ID,
} from "../../config/api_userOrder";

export const setPostUserOrderAsync = createAsyncThunk(
  "userOrder/setPostUserOrder",
  async (data) => {
    const { name, email, tel, address } = data;
    const form = {
      data: {
        user: { name, email, tel, address },
      },
    };
    try {
      const res = await axios.post(POST_USER_ORDER(), form);
      return res.data.orderId;
    } catch (error) {
      return error.response.data;
    }
  }
);
// 提交訂單

export const fetchUserOrderDataAsync = createAsyncThunk(
  "userOrder/fetchUserOrderData",
  async (orderId) => {
    const api = orderId ? GET_USER_ORDER_WITH_ID(orderId) : GET_USER_ORDER();

    try {
      const res = await axios.get(api);

      return orderId ? res.data.order : res.data.orders;
    } catch (error) {
      return error;
    }
  }
);

// 取得 user 訂單
