import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Cart.styles.scss";

import Message from "../../../components/Message/Message.component";
import CartItem from "../../../components/CartItem/CartItem.component";
import Categories from "../../../components/Categories/Categories.component";

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

// todo 需要針對運費做細節處理
