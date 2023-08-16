import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Wishlist.styles.scss";

import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../components/UI/Button/Button.component";

import { fetchCartItemsAsync } from "../../../store/cart/cart.asyncThunk";
import { setAddItemToCartAsync } from "../../../store/cart/cart.asyncThunk";
import {
  selectCartItems,
  selectCartIsLoading,
} from "../../../store/cart/cart.selector";

import { formatNumberWithCommas } from "../../../utils/common/common.utils";

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
  }, [dispatch]);

  return (
    <div className="wishlist">
      {data?.map((item) => (
        <div className="wishlist__card" key={item.id}>
          <div className="wishlist__card-content">
            <img
              className="wishlist__card-content-img"
              src={item.imageUrl}
              alt={item.title}
            />
            <div className="wishlist__card-content-info">
              <div className="wishlist__card-content-info-item">
                <div>名稱</div>
                <div>{item.title}</div>
              </div>
              <div className="wishlist__card-content-info-item">
                <div>價格</div>
                <div>NT$ {formatNumberWithCommas(item.price)}</div>
              </div>
            </div>
          </div>
          <div className="wishlist__card-function">
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
              onClick={() => func(item.id)}
            >
              刪除
            </Button>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectWhiteNm}
              disabled={isLimit(item.id) || isLoading}
              onClick={() => addToCart(item.id)}
            >
              {isLimit(item.id) ? "MAX QUANTITY" : "ADD ONE"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
