import "./PriceTag.styles.scss";

import { formatNumberWithCommas } from "../../../utils/common/common.utils";

const PriceTag = ({ origin_price, price }) => {
  return (
    <>
      {origin_price > price && (
        <p className="price-tag__sell-price">
          NT$ {formatNumberWithCommas(price)}
        </p>
      )}
      <p
        className={`price-tag__origin-price ${
          price < origin_price ? "product-on-sale" : ""
        }`}
      >
        NT$ {formatNumberWithCommas(origin_price)}
      </p>
    </>
  );
};

export default PriceTag;
