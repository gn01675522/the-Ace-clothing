import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Wishlist.styles.scss";

import { fetchCartItemsAsync } from "../../../store/cart/cart.actions";
import { setAddItemToCartAsync } from "../../../store/cart/cart.actions";
import {
  selectCartItems,
  selectCartIsLoading,
} from "../../../store/cart/cart.selector";

const Wishlist = ({ data, func }) => {
  const cartItems = useSelector(selectCartItems);
  const isLoading = useSelector(selectCartIsLoading);
  const dispatch = useDispatch();

  const isLimit = (id) => {
    const productInCart =
      cartItems?.carts?.find((item) => item.product_id === id) || null;
    if (!productInCart || productInCart?.qty < 5) {
      return false;
    } else if (productInCart.qty >= 5) {
      return true;
    }
  };
  //* 尋找購物車內相同產品，並計算是否等於或大於五個

  const addToCart = (id) => {
    const productData = {
      data: {
        product_id: id,
        qty: 1,
      },
    };
    dispatch(setAddItemToCartAsync(productData));
  };

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, []);

  return (
    <div className="wishlist">
      {data?.map((item) => (
        <div className="wishlist__card" key={item.id}>
          <div className="wishlist__card-content">
            <img className="wishlist__card-content-img" src={item.imageUrl} />
            <div className="wishlist__card-content-info">
              <div className="wishlist__card-content-info-title">
                <div>名稱</div>
                <div>{item.title}</div>
              </div>
              <div className="wishlist__card-content-info-price">
                <div>價格</div>
                <div>{item.price}</div>
              </div>
              <div className="wishlist__card-content-info-category">
                <div>種類</div>
                <div>男上衣</div>
              </div>
            </div>
          </div>
          <div className="wishlist__card-function">
            <div
              type="button"
              className="wishlist__card-function-delete"
              onClick={() => func(item.id)}
            >
              刪除
            </div>
            <button
              type="button"
              className="wishlist__card-function-add"
              disabled={isLimit(item.id) || isLoading}
              onClick={() => addToCart(item.id)}
            >
              {isLimit(item.id) ? "MAX QUANTITY" : "ADD ONE TO CART"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
