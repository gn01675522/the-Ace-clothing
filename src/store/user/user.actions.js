import axios from "axios";

import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

const { LOG_IN_START, LOG_IN_SUCCESS, LOG_IN_FAILED } = USER_ACTION_TYPES;

export const setUserLoginStart = () => createAction(LOG_IN_START);

export const setUserLoginSuccess = (data) => createAction(LOG_IN_SUCCESS, data);

export const setUserLoginFailed = (error) => createAction(LOG_IN_FAILED, error);

export const setCurrentUserAsync = (data) => {
  return async (dispatch) => {
    dispatch(setUserLoginStart());
    try {
      const res = await axios.post(`/v2/admin/signin`, data);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;

      dispatch(setUserLoginSuccess(res.data.success));
    } catch (error) {
      dispatch(setUserLoginFailed(error.response.data.message));
    }
  };
};

//*
