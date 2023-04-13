import { USER_ACTION_TYPES } from "./user.types";

const { SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_FAILED } = USER_ACTION_TYPES;

const LOGIN_INITIAL_STATE = {
  isSuccess: false,
  message: "",
  isLoading: false,
};

export const userReducer = (state = LOGIN_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_START:
      return { ...state, isLoading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, isSuccess: payload, isLoading: false };
    case SIGN_IN_FAILED:
      return {
        ...state,
        message: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
