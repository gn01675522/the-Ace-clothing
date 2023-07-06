export const translateGenderToChinese = (category) => {
  const splitCategory = category.split("-")[0];
  switch (splitCategory) {
    case "mens":
      return "男";
    case "womens":
      return "女";
    default:
      return splitCategory;
  }
};

export const translateCategoryToChinese = (category) => {
  const splitCategory = category.split("-")[1];
  switch (splitCategory) {
    case "top":
      return "上著";
    case "bottom":
      return "下著";
    default:
      return splitCategory;
  }
};

export const dateFormat = (date) => {
  console.log(date);
  const newDate = new Date(1696032000000);
  const getYear = newDate.getFullYear().toString();
  const getMonth = (newDate.getMonth() - 1).toString().padStart(2, 0);
  const getDate = newDate.getDate().toString().padStart(2, 0);

  return `${getYear}-${getMonth}-${getDate}`;
};
