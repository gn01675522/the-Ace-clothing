import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Cart.styles.scss";

import Message from "../../../components/Message/Message.component";
import CartItem from "../../../components/CartItem/CartItem.component";
import Categories from "../../../components/Categories/Categories.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../components/UI/Button/Button.component";

import { selectCartItems } from "../../../store/cart/cart.selector";
import { selectHasMessage } from "../../../store/message/message.selector";
import { setHandleMessage } from "../../../store/message/message.actions";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const hasMessage = useSelector(selectHasMessage);
  const dispatch = useDispatch();
  const couponCode = useRef(null);

  const addCoupon = async () => {
    const code = { data: { code: couponCode.current.value } };
    try {
      const res = await axios.post(
        `v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        code
      );
      dispatch(setHandleMessage("success", res));
    } catch (error) {
      dispatch(setHandleMessage("error", error));
    }
  };
  //* 由於 client coupon 只有一個 api，故不轉為 redux

  return (
    <div className="cart">
      {hasMessage && <Message />}
      <div className="cart__content">
        <h1 className="cart__content-title">
          {cartItems?.carts?.length > 0
            ? `購物車(${cartItems?.carts?.length})`
            : "您的購物車內沒有商品，去購物吧！"}
        </h1>
        {cartItems?.carts?.length > 0 ? (
          cartItems?.carts?.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })
        ) : (
          <Categories />
        )}
      </div>
      <div className="cart__info">
        <div className="cart__info-price">
          <div className="cart__info-price-items">
            <span>小計</span>
            <span>NT${cartItems.final_total}</span>
          </div>
          <div className="cart__info-price-items">
            <span>運費</span>
            <span>NT$免費</span>
          </div>
          <div className="cart__info-price-items">
            <span>總計</span>
            <span>NT${cartItems.final_total}</span>
          </div>
        </div>

        {cartItems?.carts?.length > 0 && (
          <div className="cart__info-discount">
            <h2 className="cart__info-discount-title">套用折扣碼</h2>
            <div className="cart__info-discount-area">
              <input
                type="text"
                placeholder="請輸入折扣碼"
                className="cart__info-discount-area-input"
                ref={couponCode}
              />
              <Button
                type="button"
                buttonType={BUTTON_TYPE_CLASS.addTwo}
                onClick={addCoupon}
              >
                套用
              </Button>
            </div>
            {cartItems?.carts[0]?.coupon && (
              <span className="cart__info-discount-in-use">
                已套用優惠券 {cartItems.carts[0].coupon.code}
              </span>
            )}
          </div>
        )}

        <div className="cart__info-checkout">
          {cartItems?.carts?.length !== 0 && (
            <>
              <NavLink to="/checkout" className="cart__info-checkout-link">
                前往付款
              </NavLink>
              <NavLink to="/" className="cart__info-checkout-goShop">
                繼續購物
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
