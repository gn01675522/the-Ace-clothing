export const POST_USER_ORDER = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/order`;

export const GET_USER_ORDER = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/orders`;

export const GET_USER_ORDER_WITH_ID = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/order/${id}`;
