import { combineReducers } from "@reduxjs/toolkit";

import { messageReducer } from "./message/message.slice";
import { userReducer } from "./user/user.reducer";
import { adminProductReducer } from "./adminProduct/adminProduct.slice";
import { adminCouponsReducer } from "./adminCoupons/adminCoupons.slice";
import { adminOrdersReducer } from "./adminOrders/adminOrders.slice";
import { userProductReducer } from "./userProduct/userProduct.reducer";
import { userOrderReducer } from "./userOrder/userOrder.reducer";
import { cartReducer } from "./cart/cart.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  message: messageReducer,
  adminProduct: adminProductReducer,
  adminCoupons: adminCouponsReducer,
  adminOrders: adminOrdersReducer,
  userProduct: userProductReducer,
  userOrder: userOrderReducer,
});
