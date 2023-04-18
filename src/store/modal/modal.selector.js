import { createSelector } from "@reduxjs/toolkit";

const selectModalReducer = (state) => state.modal;

export const selectModalIsOpen = createSelector(
  [selectModalReducer],
  (modal) => modal.isModalOpen
);
