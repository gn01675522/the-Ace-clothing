import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHandleMessage } from "../message/message.slice";

import {
  GET_CART_ITEM,
  POST_CART_ITEM,
  DELETE_CART_ITEM,
  PUT_CART_ITEM,
} from "../../config/api_cart";

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const res = await axios.get(GET_CART_ITEM());
      console.log(res);
      return res.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
//* fetch 目前的購物車內商品資訊

export const setAddItemToCartAsync = createAsyncThunk(
  "cart/setAddItemToCart",
  async (data, { dispatch }) => {
    try {
      const res = await axios.post(POST_CART_ITEM(), data);
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchCartItemsAsync());
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 新增商品至購物車

export const setRemoveItemFromCartAsync = createAsyncThunk(
  "cart/setRemoveItemfromCart",
  async (id, { dispatch }) => {
    try {
      const res = await axios.delete(DELETE_CART_ITEM(id));
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchCartItemsAsync());
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 從購物車內移除商品

export const setUpdateCartItemAsync = createAsyncThunk(
  "cart/setUpdateCartItem",
  async ({ item, quantity }, { dispatch }) => {
    const data = {
      data: { product_id: item.product_id, qty: quantity },
    };
    try {
      const res = await axios.put(PUT_CART_ITEM(item.id), data);
      dispatch(setHandleMessage({ type: "success", res }));
      dispatch(fetchCartItemsAsync());
    } catch (error) {
      dispatch(setHandleMessage({ type: "error", res: error }));
      return error.response.data;
    }
  }
);
//* 修改購物車內商品
