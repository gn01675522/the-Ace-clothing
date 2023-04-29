import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ORDER_ACTION_TYPES } from "./userOrder.types";

const { SET_USER_ORDER_START, SET_USER_ORDER_SUCCESS, SET_USER_ORDER_FAILED } =
  USER_ORDER_ACTION_TYPES;

export const setUserOrderStart = () => createAction(SET_USER_ORDER_START);

export const setUserOrderSuccess = (data) =>
  createAction(SET_USER_ORDER_SUCCESS, data);

export const setUserOrderFailed = (error) =>
  createAction(SET_USER_ORDER_FAILED, error);

//******************************** Sync **********************************************/
//******************************** Async **********************************************/

export const setPostUserOrderAsync = (data) => {
  const { name, email, tel, address } = data;
  const form = {
    data: {
      user: { name, email, tel, address },
    },
  };
  return async (dispatch) => {
    dispatch(setUserOrderStart());
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      dispatch(setUserOrderSuccess(res.data.orderId));
    } catch (error) {
      dispatch(setUserOrderFailed(error.response.data));
    }
  };
};
