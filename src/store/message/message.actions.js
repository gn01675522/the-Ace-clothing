import { createAction } from "../../utils/reducer/reducer.utils";
import { MESSAGE_ACTION_TYPES } from "./message.types";

const { POST_MESSAGE, CLEAR_MESSAGE } = MESSAGE_ACTION_TYPES;

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

//******************************** Helper **********************************************/
//******************************** Sync **********************************************/

export const setClearMessage = () => createAction(CLEAR_MESSAGE);

export const setSuccessMessage = (res) =>
  createAction(POST_MESSAGE, successMessageHelper(res));

export const setErrorMessage = (error) =>
  createAction(POST_MESSAGE, errorMessageHelper(error));

export const setHandleMessage = (type, res) => {
  return (dispatch) => {
    if (type === "success") {
      dispatch(setSuccessMessage(res));
    } else if (type === "error") {
      dispatch(setErrorMessage(res));
    }
    setTimeout(() => {
      dispatch(setClearMessage());
    }, 3000);
  };
};
