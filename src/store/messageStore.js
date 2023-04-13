import { createContext } from "react";

export const initState = {
  type: "",
  title: "",
  text: "",
};

export const MessageContext = createContext({});

export const messageReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "POST_MESSAGE":
      return {
        ...payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export const handleSuccessMessage = (dispatch, res) => {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "success",
      title: "更新成功",
      text: res.data.message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 3000);
};

export const handleErrorMessage = (dispatch, error) => {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "danger",
      title: "失敗",
      text: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join(",")
        : error?.response?.data?.message,
    },
  });
};
