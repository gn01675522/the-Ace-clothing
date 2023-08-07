import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setCurrentUserAsync = createAsyncThunk(
  "user/setCurrentUser",
  async (data) => {
    try {
      const res = await axios.post(`/v2/admin/signin`, data);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      return res.data.success;
    } catch (error) {
      return error.response.data.message;
    }
  }
);
//   設定登入 token
