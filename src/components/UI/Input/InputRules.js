export const INPUT_TYPE = {
  email: "email",
  name: "name",
  tel: "tel",
  address: "address",
};

export const inputRules = (category) =>
  ({
    [INPUT_TYPE.email]: {
      required: "Email 為必填",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Email 格式不正確",
      },
    },
    [INPUT_TYPE.name]: {
      required: "使用者名稱為必填",
      maxLength: {
        value: 10,
        message: "使用者名稱長度不超過 10",
      },
    },
    [INPUT_TYPE.tel]: {
      required: "電話為必填",
      minLength: { value: 6, message: "電話不少於 6 碼" },
      maxLength: { value: 12, message: "電話不超過 12 碼" },
    },
    [INPUT_TYPE.address]: { required: "地址為必填" },
  }[category]);
