import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

export const setCurrentUserAsync = createAsyncThunk(
  "user/setCurrentUser",
  async (data, { dispatch }) => {
    try {
      const res = await axios.post(`/v2/admin/signin`, data);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      dispatch(setHandleMessage({ type: "success", res }));
      return res.data.success;
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data.message;
    }
  }
);
//   設定登入 token
