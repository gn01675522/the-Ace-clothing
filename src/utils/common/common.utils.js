export const formatNumberWithCommas = (number) => {
  const formatNumber = String(number)
    .split("")
    .reverse()
    .reduce((prev, next, i) => {
      return (i % 3 ? next : next + ",") + prev;
    });
  return formatNumber;
};
