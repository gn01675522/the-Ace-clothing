//* 使用方式：
//* 1. 傳入單筆 product 資料(物件形式)
//* 2. 傳入產品 urlParam，目的是為了 Link 的路由能符合商品種類

import { Link } from "react-router-dom";

import "./ProductCard.styles.scss";

import PriceTag from "../UI/PriceTag/PriceTag.component";

import { ReactComponent as WhiteHeart } from "../../assets/whiteHeart.svg";
import { ReactComponent as RedHeart } from "../../assets/redHeart.svg";

const ProductCard = ({
  product,
  urlParam,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const { id, imageUrl, title, origin_price, price } = product;

  return (
    <Link to={`/${urlParam}/${id}`} className="products-card">
      <div className="products-card__preview">
        <img
          src={imageUrl}
          className="products-card__img"
          alt={`product in ${urlParam}: ${title}`}
        />
      </div>
      <div className="products-card__content">
        <div className="products-card__content-info">
          <h4 className="products-card__content-info-title">{title}</h4>
          <div className="products-card__content-info-price">
            <PriceTag origin_price={origin_price} price={price} />
          </div>
        </div>
        <div className="products-card__content-function">
          <div
            className="products-card__content-function-wrapper"
            onClick={(e) =>
              isFavorite ? onRemoveFavorite(e, id) : onAddFavorite(e, id)
            }
          >
            {isFavorite ? (
              <RedHeart className="products-card__content-function-favorite" />
            ) : (
              <WhiteHeart className="products-card__content-function-favorite" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
