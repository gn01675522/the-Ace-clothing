import { combineReducers } from "@reduxjs/toolkit";

import { messageReducer } from "./message/message.slice";
import { userReducer } from "./user/user.slice";
import { adminProductReducer } from "./adminProduct/adminProduct.slice";
import { adminCouponsReducer } from "./adminCoupons/adminCoupons.slice";
import { adminOrdersReducer } from "./adminOrders/adminOrders.slice";
import { userProductReducer } from "./userProduct/userProduct.slice";
import { userOrderReducer } from "./userOrder/userOrder.slice";
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

export type RootState = ReturnType<typeof rootReducer>;
