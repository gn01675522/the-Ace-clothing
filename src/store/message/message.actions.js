import { MESSAGE_ACTION_TYPES } from "./message.types";
import { createAction } from "../../utils/reducer.utils";

const { POST_MESSAGE, CLEAR_MESSAGE } = MESSAGE_ACTION_TYPES;

export const setSuccessMessage = (res) => {
  createAction(POST_MESSAGE, {
    type: "success",
    title: "更新成功",
    text: res.data.message,
  });
};

export const setErrorMessage = (error) => {
  createAction(POST_MESSAGE, {
    type: "danger",
    title: "失敗",
    text: Array.isArray(error?.response?.data?.message)
      ? error?.response?.data?.message.join(",")
      : error?.response?.data?.message,
  });
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
