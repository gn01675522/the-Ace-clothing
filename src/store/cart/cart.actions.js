import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const {
  FETCH_CART_ITEMS_START,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAILED,
  ADD_CART_ITEMS_START,
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_FAILED,
} = CART_ACTION_TYPES;

export const fetchCartItemsStart = () => createAction(FETCH_CART_ITEMS_START);

export const fetchCartItemsSuccess = (data) =>
  createAction(FETCH_CART_ITEMS_SUCCESS, data);

export const fetchCartItemsFailed = (error) =>
  createAction(FETCH_CART_ITEMS_FAILED, error);

export const addCartItemStart = () => createAction(ADD_CART_ITEMS_START);

export const addCartItemSuccess = () => createAction(ADD_CART_ITEMS_SUCCESS);

export const addCartItemFailed = (error) =>
  createAction(ADD_CART_ITEMS_FAILED, error);

export const fetchCartItemsAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCartItemsStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      dispatch(fetchCartItemsSuccess(res.data.data));
    } catch (error) {
      dispatch(fetchCartItemsFailed(error));
    }
  };
};

export const setAddItemToCartAsync = (data) => {
  return async (dispatch) => {
    dispatch(addCartItemStart());
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      console.log(res);
      dispatch(addCartItemSuccess());
    } catch (error) {
      dispatch(addCartItemFailed(error));
    }
  };
};

export const setRemoveItemToCartAsync = () => {};
