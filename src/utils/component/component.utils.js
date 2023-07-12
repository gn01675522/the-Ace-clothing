export const translateGenderToChinese = (category) => {
  const splitCategory = category.split("-")[0];
  switch (splitCategory) {
    case "mens":
      return "男";
    case "womens":
      return "女";
    case "hats":
      return "帽子";
    case "shoes":
      return "鞋";
    case "accessories":
      return "飾品";
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
    case "neutral":
      return "(中性)";
    case "mens":
      return "(男性)";
    case "womens":
      return "(女性)";
    case "belt":
      return "(皮帶)";
    case "bracelet":
      return "(手鍊)";
    case "necklace":
      return "(項鍊)";
    case "rings":
      return "(戒指)";
    case "other":
      return "(其他)";
    default:
      return splitCategory;
  }
};

export const dateFormat = (date) => {
  const newDate = new Date(date);
  const getYear = newDate.getFullYear().toString();
  const getMonth = (newDate.getMonth() + 1).toString().padStart(2, 0);
  const getDate = newDate.getDate().toString().padStart(2, 0);

  return `${getYear}-${getMonth}-${getDate}`;
};
