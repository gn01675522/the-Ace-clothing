import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CartIcon.styles.scss";

import { ReactComponent as CartLogo } from "../../assets/cart.svg";
import { selectCartItemsQuantity } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const [isItemChange, setIsItemChange] = useState(false);
  const quantity = useSelector(selectCartItemsQuantity);

  const btnClasses = `cart-icon__logo ${
    isItemChange ? "cart-icon__logo--bump" : ""
  }`;

  useEffect(() => {
    if (quantity === 0) {
      return;
    }
    setIsItemChange(true);
    const timer = setTimeout(() => {
      setIsItemChange(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [quantity]);

  return (
    <NavLink className="cart-icon" to="/cart" aria-label="cart link">
      <CartLogo className={btnClasses} />
      {quantity !== 0 && <div className="cart-icon__count">{quantity}</div>}
    </NavLink>
  );
};

export default CartIcon;
