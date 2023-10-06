export const GET_ADMIN_PRODUCT_ALL = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`;

export const DELETE_ADMIN_PRODUCT = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`;

export const PUT_ADMIN_PRODUCT = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`;

export const POST_ADMIN_PRODUCT = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
