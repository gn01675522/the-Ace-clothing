import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Cart.styles.scss";

import Message from "../../../components/Message/Message";
import CartItem from "../../../components/CartItem/CartItem.component";

import { selectCartItems } from "../../../store/cart/cart.selector";
import { selectHasMessage } from "../../../store/message/message.selector";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const hasMessage = useSelector(selectHasMessage);

  return (
    <div className="cart">
      {hasMessage && <Message />}
      <div className="cart__content">
        <h1 className="cart__content-title">
          購物車({cartItems?.carts?.length})
        </h1>
        {cartItems?.carts?.length > 0 ? (
          cartItems?.carts?.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })
        ) : (
          <h5>您的購物車沒有商品</h5>
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

        <div className="cart__info-checkout">
          {cartItems ? (
            <>
              <NavLink to="/checkout" className="cart__info-checkout-link">
                前往付款
              </NavLink>
              <NavLink to="/" className="cart__info-checkout-goShop">
                繼續購物
              </NavLink>
            </>
          ) : (
            <NavLink to="/" className="cart__info-backShop">
              去購物吧
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
