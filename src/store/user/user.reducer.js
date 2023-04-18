import { USER_ACTION_TYPES } from "./user.types";

const { LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAILED } = USER_ACTION_TYPES;

const INITIAL_STATE = {
  isSuccess: false,
  message: "",
  isLoading: false,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN_START:
      return { ...state, isLoading: true };
    case LOG_IN_SUCCESS:
      return { ...state, isSuccess: payload, isLoading: false };
    case LOG_IN_FAILED:
      return {
        ...state,
        message: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
