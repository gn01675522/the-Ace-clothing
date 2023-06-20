//* 使用方式：
//* 1. 傳入單筆 product 資料
//* 2. 傳入產品 urlParam，目的是為了 Link 的路由能符合商品種類

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ProductCard.styles.scss";
import { useNavigate } from "react-router-dom";

import { setAddItemToCartAsync } from "../../store/cart/cart.actions";

const ProductCard = ({ product, urlParam }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, imageUrl, title, price } = product;

  const onClickToViewProduct = () => {
    navigate(`/${urlParam}/${id}`);
  };

  const addToCart = (e) => {
    e.stopPropagation();
    const data = {
      data: {
        product_id: id,
        qty: 1,
      },
    };
    dispatch(setAddItemToCartAsync(data));
  };

  return (
    <div onClick={onClickToViewProduct} className="products-card">
      <div className="products-card__preview">
        <button
          className="products-card__function"
          onClick={(e) => addToCart(e)}
        >
          QUICK ADD
        </button>
        <img src={imageUrl} className="products-card__img" alt="..." />
      </div>
      <div className="products-card__info">
        <h4 className="products-card__info-title">{title}</h4>
        <p className="products-card__info-price">NT$ {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
