export const GET_CART_ITEM = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/cart`;

export const POST_CART_ITEM = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/cart`;

export const DELETE_CART_ITEM = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`;

export const PUT_CART_ITEM = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`;
