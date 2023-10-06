export const GET_USER_PRODUCT = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`;

export const GET_USER_PRODUCT_WITH_ID = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`;
