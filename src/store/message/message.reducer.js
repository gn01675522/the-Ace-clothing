import { MESSAGE_ACTION_TYPES } from "./message.types";

const { POST_MESSAGE, CLEAR_MESSAGE } = MESSAGE_ACTION_TYPES;

const MESSAGE_INITIAL_STATE = {
  type: "",
  title: "",
  text: "",
};

export const messageReducer = (state = MESSAGE_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case POST_MESSAGE:
      return { ...payload };
    case CLEAR_MESSAGE:
      return { ...MESSAGE_INITIAL_STATE };
    default:
      return state;
  }
};
