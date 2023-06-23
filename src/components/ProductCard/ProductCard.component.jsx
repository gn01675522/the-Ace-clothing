//* 使用方式：
//* 1. 傳入單筆 product 資料
//* 2. 傳入產品 urlParam，目的是為了 Link 的路由能符合商品種類

import { Link } from "react-router-dom";
import "./ProductCard.styles.scss";
import PriceTag from "../UI/PriceTag/PriceTag.component";

const ProductCard = ({ product, urlParam }) => {
  const { id, imageUrl, title, origin_price, price } = product;

  return (
    <Link to={`/${urlParam}/${id}`} className="products-card">
      <div className="products-card__preview">
        <img src={imageUrl} className="products-card__img" alt="..." />
      </div>
      <div className="products-card__info">
        <h4 className="products-card__info-title">{title}</h4>
        <p className="products-card__info-price">
          <PriceTag origin_price={origin_price} price={price} />
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
