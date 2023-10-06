export const GET_ADMIN_COUPONS = (page) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`;

export const DELETE_ADMIN_COUPONS = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`;

export const POST_ADMIN_COUPONS = () =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;

export const PUT_ADMIN_COUPONS = (id) =>
  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`;
