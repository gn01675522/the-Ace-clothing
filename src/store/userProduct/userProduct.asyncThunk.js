import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProductAsync = createAsyncThunk(
  "userProduct/fetchUserProduct",
  async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
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
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      return productRes.data.product;
    } catch (error) {
      return error.response.data;
    }
  }
);
//* 讓 api 根據我們傳入的 id 來找到我們要的產品
