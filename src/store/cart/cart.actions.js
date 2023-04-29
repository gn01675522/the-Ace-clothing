import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const {
  FETCH_CART_ITEMS_START,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAILED,
  SET_CART_ITEMS_START,
  SET_CART_ITEMS_SUCCESS,
  SET_CART_ITEMS_FAILED,
  SET_CART_ITEMS_UPDATE_START,
  SET_CART_ITEMS_UPDATE_SUCCESS,
  SET_CART_ITEMS_UPDATE_FAILED,
} = CART_ACTION_TYPES;

export const fetchCartItemsStart = () => createAction(FETCH_CART_ITEMS_START);

export const fetchCartItemsSuccess = (data) =>
  createAction(FETCH_CART_ITEMS_SUCCESS, data);

export const fetchCartItemsFailed = (error) =>
  createAction(FETCH_CART_ITEMS_FAILED, error);
//* 以上為 擷取 api 資料

export const setCartItemStart = () => createAction(SET_CART_ITEMS_START);

export const setCartItemSuccess = () => createAction(SET_CART_ITEMS_SUCCESS);

export const setCartItemFailed = (error) =>
  createAction(SET_CART_ITEMS_FAILED, error);

export const setUpdateCartItemStart = (data) =>
  createAction(SET_CART_ITEMS_UPDATE_START, data);

export const setUpdateCartItemSuccess = () =>
  createAction(SET_CART_ITEMS_UPDATE_SUCCESS);

export const setUpdateCartItemFailed = (error) =>
  createAction(SET_CART_ITEMS_UPDATE_FAILED, error);

//******************************** Sync **********************************************/
//******************************** Async **********************************************/

export const fetchCartItemsAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCartItemsStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      dispatch(fetchCartItemsSuccess(res.data.data));
    } catch (error) {
      dispatch(fetchCartItemsFailed(error.response.data));
    }
  };
};

export const setAddItemToCartAsync = (data) => {
  return async (dispatch) => {
    dispatch(setCartItemStart());
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      dispatch(setCartItemSuccess());
      dispatch(fetchCartItemsAsync());
    } catch (error) {
      dispatch(setCartItemFailed(error.response.data));
    }
  };
};

export const setRemoveItemToCartAsync = (id) => {
  return async (dispatch) => {
    dispatch(setCartItemStart());
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      dispatch(setCartItemSuccess());
      dispatch(fetchCartItemsAsync());
    } catch (error) {
      dispatch(setCartItemFailed(error.response.data));
    }
  };
};

export const setUpdateCartItemAsync = (item, quantity, loadingItems) => {
  return async (dispatch) => {
    const data = {
      data: { product_id: item.product_id, qty: quantity },
    };
    dispatch(setUpdateCartItemStart([...loadingItems, item.id]));
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      dispatch(setUpdateCartItemSuccess());
      dispatch(fetchCartItemsAsync());
    } catch (error) {
      dispatch(setUpdateCartItemFailed(error.response.data));
    }
  };
};
