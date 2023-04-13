import axios from "axios";

export const fetchLogin = async (data) => {
  try {
    const res = await axios.post(`/v2/admin/signin`, data);
    const { token, expired } = res.data;
    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
    return res;
  } catch (error) {
    return error;
  }
};
