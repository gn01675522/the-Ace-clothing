import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  GET_USER_PRODUCT,
  GET_USER_PRODUCT_WITH_ID,
} from "../../config/api_userProduct";

export const fetchUserProductAsync = createAsyncThunk(
  "userProduct/fetchUserProduct",
  async () => {
    try {
      const res = await axios.get(GET_USER_PRODUCT());
      return res.data.products;
    } catch (error) {
      return error.response.data;
    }
  }
);
//* 取得 api 裡面全部的產品資訊

export const fetchUserSingleProductAsync = createAsyncThunk(
  "userProduct/fetchUserSingleProduct",
  async (id) => {
    try {
      const productRes = await axios.get(GET_USER_PRODUCT_WITH_ID(id));
      return productRes.data.product;
    } catch (error) {
      return error.response.data;
    }
  }
);
//* 讓 api 根據我們傳入的 id 來找到我們要的產品
