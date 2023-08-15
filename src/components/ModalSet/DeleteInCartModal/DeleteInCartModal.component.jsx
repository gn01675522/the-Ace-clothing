import { useSelector, useDispatch } from "react-redux";
import "./DeleteInCartModal.styles.scss";

import Button, { BUTTON_TYPE_CLASS } from "../../UI/Button/Button.component";

import { setCartIsModalOpen } from "../../../store/cart/cart.slice";
import { selectCartTempData } from "../../../store/cart/cart.selector";
import { setRemoveItemFromCartAsync } from "../../../store/cart/cart.asyncThunk";

const DeleteInCartModal = () => {
  const dispatch = useDispatch();
  const itemId = useSelector(selectCartTempData);

  const modalAction = (type) => {
    if (type === "checked") {
      dispatch(setRemoveItemFromCartAsync(itemId));
      dispatch(setCartIsModalOpen(false));
    } else if (type === "close") {
      dispatch(setCartIsModalOpen(false));
    }
  };
  //* 若為 checked，則移除購物車單項物件；反之為關閉 modal

  return (
    <div className="delete-in-cart-modal">
      <h1 className="delete-in-cart-modal__content">確認刪除此商品嗎？</h1>
      <div className="delete-in-cart-modal__function">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
          onClick={() => modalAction("checked")}
        >
          確定刪除
        </Button>
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
          onClick={() => modalAction("close")}
        >
          取消刪除
        </Button>
      </div>
    </div>
  );
};

export default DeleteInCartModal;
