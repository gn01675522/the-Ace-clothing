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
        <h1 className="cart__content-title">My Cart</h1>
        {cartItems?.carts?.length > 0 ? (
          cartItems?.carts?.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })
        ) : (
          <h5>您的購物車沒有商品</h5>
        )}
      </div>

      <div className="cart__info">
        <div
          className="col-md-6 bg-white py-5"
          style={{ minHeight: "calc(100vh - 56px - 76px)" }}
        >
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${cartItems.final_total}</p>
          </div>
          {cartItems ? (
            <NavLink
              to="/checkout"
              className="btn btn-dark w-100 mt-4 rounded-0 py-3"
            >
              確認商品正確
            </NavLink>
          ) : (
            <NavLink
              to="/products"
              className="btn btn-dark w-100 mt-4 rounded-0 py-3"
            >
              去購物吧
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
