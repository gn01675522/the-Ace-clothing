//* 使用方式：
//* 1. 傳入單筆 product 資料(物件形式)
//* 2. 傳入產品 urlParam，目的是為了 Link 的路由能符合商品種類

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./ProductCard.styles.scss";

import PriceTag from "../UI/PriceTag/PriceTag.component";

import { ReactComponent as WhiteHeart } from "../../assets/whiteHeart.svg";
import { ReactComponent as RedHeart } from "../../assets/redHeart.svg";

import { setUserFavorite } from "../../store/user/user.slice";
import { selectUserFavorite } from "../../store/user/user.selector";

const ProductCard = ({ product, urlParam, isFavorite }) => {
  const dispatch = useDispatch();
  const { id, imageUrl, title, origin_price, price } = product;
  const wishlist = useSelector(selectUserFavorite);

  const onAddFavorite = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    const newList = [...wishlist, id];
    dispatch(setUserFavorite(newList));
  };

  const onRemoveFavorite = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    const removeFavorite = wishlist.filter((item) => item !== id);
    dispatch(setUserFavorite(removeFavorite));
  };

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
          <div
            className="products-card__content-info-wrapper"
            onClick={(e) =>
              isFavorite ? onRemoveFavorite(e, id) : onAddFavorite(e, id)
            }
          >
            {isFavorite ? (
              <RedHeart className="products-card__content-info-favorite" />
            ) : (
              <WhiteHeart className="products-card__content-info-favorite" />
            )}
          </div>
        </div>
        <div className="products-card__content-price">
          <PriceTag origin_price={origin_price} price={price} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
