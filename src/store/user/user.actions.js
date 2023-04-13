import axios from "axios";

import { createAction } from "../../utils/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

const { SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_FAILED } = USER_ACTION_TYPES;

export const setUserSigninStart = () => createAction(SIGN_IN_START);

export const setUserSigninSuccess = (data) =>
  createAction(SIGN_IN_SUCCESS, data);

export const setUserSigninFailed = (error) =>
  createAction(SIGN_IN_FAILED, error);

export const setCurrentUserAsync = (data) => {
  return async (dispatch) => {
    dispatch(setUserSigninStart());
    try {
      const res = await axios.post(`/v2/admin/signin`, data);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
      
      dispatch(setUserSigninSuccess(res.data.success));
    } catch (error) {
      dispatch(setUserSigninFailed(error.response.data.message));
    }
  };
};

//*
