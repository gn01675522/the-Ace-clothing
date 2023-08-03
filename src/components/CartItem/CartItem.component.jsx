import { useDispatch, useSelector } from "react-redux";

import "./CartItem.styles.scss";

import Button, { BUTTON_TYPE_CLASS } from "../UI/Button/Button.component";

import {
  setRemoveItemToCartAsync,
  setUpdateCartItemAsync,
} from "../../store/cart/cart.actions";
import { selectCartLoadingItems } from "../../store/cart/cart.selector";
import {
  translateGenderToChinese,
  translateCategoryToChinese,
} from "../../utils/component/component.utils";

const CartItem = ({ item }) => {
  const { id: itemId, qty, final_total } = item;
  const { category, title, imageUrl } = item.product;
  const dispatch = useDispatch();
  const loadingItems = useSelector(selectCartLoadingItems);
  const clotheCategory = translateGenderToChinese(category).concat(
    translateCategoryToChinese(category)
  );

  const removeCartItem = () => {
    dispatch(setRemoveItemToCartAsync(itemId));
  };
  //* 移除購物車單項物件

  const updateCartItem = (quantity) => {
    dispatch(setUpdateCartItemAsync(item, quantity, loadingItems));
  };
  //* 透過下拉式選單選擇數量

  return (
    <div className="cart-item">
      <div className="cart-item__left">
        <img
          src={imageUrl}
          className="cart-item__left-img"
          alt={`product in cart: ${title}`}
        />
      </div>

      <div className="cart-item__right">
        <div className="cart-item__right-header">
          <h2 className="cart-item__right-header-title">{title}</h2>
          <p className="cart-item__right-header-category">{clotheCategory}</p>
        </div>
        <div className="cart-item__right-body">
          <div className="cart-item__right-body-content">
            <span>Color</span>
            <span>預設</span>
          </div>
          <div className="cart-item__right-body-content">
            <span>Size</span>
            <span>預設</span>
          </div>
          <div className="cart-item__right-body-content-count">
            <select
              className="cart-item__right-body-content-count-select"
              value={qty}
              disabled={loadingItems.includes(itemId)}
              onChange={(e) => {
                updateCartItem(e.target.value * 1);
              }}
            >
              {[...new Array(5)].map((_, num) => {
                return (
                  <option value={num + 1} key={num}>
                    {num + 1}
                  </option>
                );
              })}
            </select>
            <span>NT${Math.round(final_total)}</span>
          </div>
        </div>
        <div className="cart-item__right-footer">
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.rectWhiteLg}
            onClick={removeCartItem}
          >
            刪除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
