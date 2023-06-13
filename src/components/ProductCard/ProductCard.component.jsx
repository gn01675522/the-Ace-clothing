//* Parent：
//* 1. Product.component.jsx

//* 使用方式：
//* 1. 傳入單筆 product 資料
//* 2. 傳入產品 category

import { Link } from "react-router-dom";
import "./ProductCard.styles.scss";

const ProductCard = ({ product, urlParam }) => {
  return (
    <Link to={`/${urlParam}/${product.id}`} className="products-card">
      <div className="products-card__preview">
        <img src={product.imageUrl} className="products-card__img" alt="..." />
      </div>
      <div className="products-card__info">
        <h4 className="products-card__info-title">{product.title}</h4>
        <p className="products-card__info-price">NT$ {product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
