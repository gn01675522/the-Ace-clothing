import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: undefined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      [thunk, process.env.NODE_ENV !== "production" ? logger : null].filter(
        Boolean
      )
    ),
});
