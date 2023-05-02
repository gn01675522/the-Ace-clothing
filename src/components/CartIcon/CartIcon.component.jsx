import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CartIcon.styles.scss";

import { ReactComponent as CartLogo } from "../../assets/cart.svg";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const cartItems = useSelector(selectCartItems);
  return (
    <NavLink className="cart-icon__container" to="/cart">
      <CartLogo className="cart-icon__logo" />
      <span className="cart-icon__count">{cartItems?.carts?.length}</span>
    </NavLink>
  );
};

export default CartIcon;
