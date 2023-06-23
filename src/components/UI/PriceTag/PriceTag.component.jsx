import "./PriceTag.styles.scss"

const PriceTag = ({ origin_price, price }) => {
  return (
    <>
      {origin_price > price && (
        <p className="price-tag__sell-price">
          NT${price}
        </p>
      )}
      <p
        className={`price-tag__origin-price ${
          price < origin_price ? "product-on-sale" : ""
        }`}
      >
        NT${origin_price}
      </p>
    </>
  );
};

export default PriceTag;
