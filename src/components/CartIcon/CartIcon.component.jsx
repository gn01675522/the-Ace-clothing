import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CartIcon.styles.scss";

import { ReactComponent as CartLogo } from "../../assets/cart.svg";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const cartItems = useSelector(selectCartItems);
  console.log("inside CartIcon", cartItems?.carts?.length);
  return (
    <NavLink className="cart-icon" to="/cart">
      <CartLogo className="cart-icon__logo" />
      <span className="cart-icon__count">{cartItems?.carts?.length}</span>
    </NavLink>
  );
};

export default CartIcon;
