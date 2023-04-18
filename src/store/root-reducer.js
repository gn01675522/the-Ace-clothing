import { combineReducers } from "redux";
import { messageReducer } from "./message/message.reducer";
import { userReducer } from "./user/user.reducer";
import { adminProductReducer } from "./adminProduct/adminProduct.reducer";
import { adminCouponsReducer } from "./adminCoupons/adminCoupons.reducer";
import { adminOrdersReducer } from "./adminOrders/adminOrders.reducer";
import { modalReducer } from "./modal/modal.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  message: messageReducer,
  adminProduct: adminProductReducer,
  adminCoupons: adminCouponsReducer,
  adminOrders: adminOrdersReducer,
});
