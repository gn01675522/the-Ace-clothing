import { MODAL_ACTION_TYPES } from "./modal.types";

const { SET_MODAL_OPEN, SET_MODAL_CONTENT } = MODAL_ACTION_TYPES;

const INITIAL_STATE = {
  isModalOpen: false,
  modalContent: {},
  modalType: null,
};

export const modalReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MODAL_OPEN:
      return { ...state, isModalOpen: payload };
    case SET_MODAL_CONTENT:
      return;
    default:
      return state;
  }
};
