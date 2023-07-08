import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ORDER_ACTION_TYPES } from "./userOrder.types";

const {
  SET_USER_ORDER_START,
  SET_USER_ORDER_SUCCESS,
  SET_USER_ORDER_FAILED,
  FETCH_USER_ORDER_DATA_START,
  FETCH_USER_ORDER_DATA_SUCCESS,
  FETCH_USER_ORDER_DATA_FAILED,
  SET_CLEAR_USER_ORDER_STATE,
} = USER_ORDER_ACTION_TYPES;

export const setUserOrderStart = () => createAction(SET_USER_ORDER_START);

export const setUserOrderSuccess = (data) =>
  createAction(SET_USER_ORDER_SUCCESS, data);

export const setUserOrderFailed = (error) =>
  createAction(SET_USER_ORDER_FAILED, error);

export const fetchUserOrderDataStart = () =>
  createAction(FETCH_USER_ORDER_DATA_START);

export const fetchUserOrderDataSuccess = (data) =>
  createAction(FETCH_USER_ORDER_DATA_SUCCESS, data);

export const fetchUserOrderDataFailed = (error) =>
  createAction(FETCH_USER_ORDER_DATA_FAILED, error);

export const setClearUserOrderState = () =>
  createAction(SET_CLEAR_USER_ORDER_STATE);

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

export const fetchUserOrderDataAsync = (orderId) => {
  return async (dispatch) => {
    dispatch(fetchUserOrderDataStart());
    const api = orderId
      ? `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      : `/v2/api/${process.env.REACT_APP_API_PATH}/orders`;

    try {
      const res = await axios.get(api);
      dispatch(
        fetchUserOrderDataSuccess(orderId ? res.data.order : res.data.orders)
      );
    } catch (error) {
      dispatch(fetchUserOrderDataFailed(error));
    }
  };
};
