import axios from "axios";
import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_PRODUCT_ACTION_TYPES } from "./userProducts.types";

const {
  FETCH_USER_PRODUCT_START,
  FETCH_USER_PRODUCT_SUCCESS,
  FETCH_USER_PRODUCT_FAILED,
} = USER_PRODUCT_ACTION_TYPES;

export const fetchUserProductStart = () =>
  createAction(FETCH_USER_PRODUCT_START);

export const fetchUserProductSuccess = (data) =>
  createAction(FETCH_USER_PRODUCT_SUCCESS, data);

export const fetchUserProductFailed = (error) =>
  createAction(FETCH_USER_PRODUCT_FAILED, error);

//******************************** Sync **********************************************/
//******************************** Async **********************************************/

export const fetchUserProductAsync = (page = 1) => {
  return async (dispatch) => {
    dispatch(fetchUserProductStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
      );
      dispatch(
        fetchUserProductSuccess({
          products: res.data.products,
          pagination: res.data.pagination,
        })
      );
    } catch (error) {
      dispatch(fetchUserProductFailed(error.response.data));
    }
  };
};

export const fetchUserProductAsyncTest = () => {
  return async (dispatch) => {
    dispatch(fetchUserProductStart());
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      dispatch(
        fetchUserProductSuccess({
          products: res.data.products,
        })
      );
    } catch (error) {
      dispatch(fetchUserProductFailed(error.response.data));
    }
  };
};
