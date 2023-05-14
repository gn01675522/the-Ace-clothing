import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CartIcon.styles.scss";

import { ReactComponent as CartLogo } from "../../assets/cart.svg";
import { selectCartItemsQuantity } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const quantity = useSelector(selectCartItemsQuantity);

  return (
    <NavLink className="cart-icon" to="/cart">
      <CartLogo className="cart-icon__logo" />
      <span className="cart-icon__count">{quantity}</span>
    </NavLink>
  );
};

export default CartIcon;
