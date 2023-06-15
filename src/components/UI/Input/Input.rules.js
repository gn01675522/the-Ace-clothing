export const INPUT_CATEGORY = {
  email: "email",
  name: "name",
  tel: "tel",
  address: "address",
};

export const inputRules = (category) =>
  ({
    [INPUT_CATEGORY.email]: {
      required: "Email 為必填",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Email 格式不正確",
      },
    },
    [INPUT_CATEGORY.name]: {
      required: "使用者名稱為必填",
      maxLength: {
        value: 10,
        message: "使用者名稱長度不超過 10",
      },
    },
    [INPUT_CATEGORY.tel]: {
      required: "電話為必填",
      validate: (value) => {
        const regex = /^\d{8,12}$/;
        if (!regex.test(value)) {
          return "請輸入8位以上12位以下數字(e.g. 027777777)";
        }
        return true;
      },
    },
    [INPUT_CATEGORY.address]: { required: "地址為必填" },
  }[category]);
