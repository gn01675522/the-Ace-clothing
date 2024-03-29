import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});
