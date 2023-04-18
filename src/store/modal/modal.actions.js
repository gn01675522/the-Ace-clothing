import { createAction } from "../../utils/reducer/reducer.utils";
import { MODAL_ACTION_TYPES } from "./modal.types";

const { SET_MODAL_OPEN, SET_MODAL_CONTENT } = MODAL_ACTION_TYPES;

export const setModalOpen = (bool) => createAction(SET_MODAL_OPEN, bool);
