import { MESSAGE_ACTION_TYPES } from "./message.types";
import { createAction } from "../../utils/reducer.utils";

const { POST_MESSAGE, CLEAR_MESSAGE } = MESSAGE_ACTION_TYPES;

export const setClearMessage = () => createAction(CLEAR_MESSAGE);

export const setSuccessMessage = (res) =>
  createAction(POST_MESSAGE, {
    type: "success",
    title: "更新成功",
    text: res.data.message,
  });

export const setErrorMessage = (error) =>
  createAction(POST_MESSAGE, {
    type: "danger",
    title: "失敗",
    text: Array.isArray(error?.response?.data?.message)
      ? error?.response?.data?.message.join(",")
      : error?.response?.data?.message,
  });

export const setHandleMessage = (type, res) => {
  return (dispatch) => {
    if (type === "success") {
      console.log("inside message action", res);
      dispatch(setSuccessMessage(res));
    } else if (type === "error") {
      console.log("inside message action", res);
      dispatch(setErrorMessage(res));
    }
    setTimeout(() => {
      dispatch(setClearMessage());
    }, 3000);
  };
};
