import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  hasMessage: false,
  message: [],
};

//********** Helper **********
const successMessageHelper = (res) => ({
  type: "success",
  title: "更新成功",
  text: res.data.message,
});

const errorMessageHelper = (error) => ({
  type: "danger",
  title: "失敗",
  text: Array.isArray(error?.response?.data?.message)
    ? error?.response?.data?.message.join(",")
    : error?.response?.data?.message,
});
//********** Helper **********

export const messageSlice = createSlice({
  name: "message",
  initialState: INITIAL_STATE,
  reducers: {
    setClearMessage() {
      return INITIAL_STATE;
    },
    setMessage(state, action) {
      const { type, res } = action.payload;

      state.hasMessage = true;

      if (type === "success") {
        state.message = successMessageHelper(res);
      } else if (type === "error") {
        state.message = errorMessageHelper(res);
      }
    },
  },
});

const { setClearMessage, setMessage } = messageSlice.actions;

export const setHandleMessage = (payload) => (dispatch) => {
  dispatch(setMessage(payload));
  setTimeout(() => {
    dispatch(setClearMessage());
  }, 3000);
};

export const messageReducer = messageSlice.reducer;
