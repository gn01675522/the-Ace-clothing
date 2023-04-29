// adminProduct redux
import { MESSAGE_ACTION_TYPES } from "./message.types";

const { POST_MESSAGE, CLEAR_MESSAGE } = MESSAGE_ACTION_TYPES;

const INITIAL_STATE = {
  hasMessage: false,
  message: [],
};

export const messageReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case POST_MESSAGE:
      return { hasMessage: true, message: payload };

    case CLEAR_MESSAGE:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
