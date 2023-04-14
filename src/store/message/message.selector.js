import { createSelector } from "@reduxjs/toolkit";

const selectMessageReducer = (state) => state.message;
//* 選取 rootReducer 上的 message reducer

export const selectHasMessage = createSelector(
  [selectMessageReducer],
  (message) => message.hasMessage
);

export const selectMessageType = createSelector(
  [selectMessageReducer],
  (message) => message.type
);

export const selectMessageTitle = createSelector(
  [selectMessageReducer],
  (message) => message.title
);

export const selectMessageText = createSelector(
  [selectMessageReducer],
  (message) => message.text
);
