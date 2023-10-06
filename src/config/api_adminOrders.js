export const GET_ADMIN_ORDERS = (page) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`;

export const PUT_ADMIN_ORDERS = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`;

export const DELETE_ADMIN_ORDERS = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`;
