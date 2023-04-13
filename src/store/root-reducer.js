import { combineReducers } from "redux";
import { messageReducer } from "./message/message.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
});
