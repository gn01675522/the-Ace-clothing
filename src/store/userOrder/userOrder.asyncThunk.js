import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      console.log("inside orderOrder", res);
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
    const api = orderId
      ? `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      : `/v2/api/${process.env.REACT_APP_API_PATH}/orders`;

    try {
      const res = await axios.get(api);

      return orderId ? res.data.order : res.data.orders;
    } catch (error) {
      return error;
    }
  }
);

// 取得 user 訂單
