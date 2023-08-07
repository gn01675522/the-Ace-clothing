//* parent component：
//* 1. ModalPortal.component.jsx

import { useDispatch, useSelector } from "react-redux";

import "./DeleteModal.styles.scss";

import Button, { BUTTON_TYPE_CLASS } from "../../UI/Button/Button.component";

import {
  setAdminProductModalOpen,
  deleteAdminProductAsync,
} from "../../../store/adminProduct/adminProduct.actions";

import { selectAdminProductTempData } from "../../../store/adminProduct/adminProduct.selector";

import {
  setAdminOrdersIsModalOpen,
  deleteAdminOrdersAsync,
} from "../../../store/adminOrders/adminOrders.actions";

import { selectAdminOrdersTempData } from "../../../store/adminOrders/adminOrders.selector";

import { deleteAdminCouponsAsync } from "../../../store/adminCoupons/adminCoupons.asyncThunk";
import { setAdminCouponsOpen } from "../../../store/adminCoupons/adminCoupons.slice";

import { selectAdminCouponsTempData } from "../../../store/adminCoupons/adminCoupons.selector";

export const DELETE_MODAL_TYPE = {
  adminProduct: "adminProduct",
  adminCoupon: "adminCoupon",
  adminOrder: "adminOrder",
};

const deleteForWhat = (type) =>
  ({
    [DELETE_MODAL_TYPE.adminProduct]: {
      isModalOpen: setAdminProductModalOpen,
      deleteAction: deleteAdminProductAsync,
      deleteItem: selectAdminProductTempData,
    },
    [DELETE_MODAL_TYPE.adminCoupon]: {
      isModalOpen: setAdminCouponsOpen,
      deleteAction: deleteAdminCouponsAsync,
      deleteItem: selectAdminCouponsTempData,
    },
    [DELETE_MODAL_TYPE.adminOrder]: {
      isModalOpen: setAdminOrdersIsModalOpen,
      deleteAction: deleteAdminOrdersAsync,
      deleteItem: selectAdminOrdersTempData,
    },
  }[type]);
//* 因有非常多情境可使用此 Modal，故無單一對應之 redux
//* 由於可能會給不同主題來使用，所以這邊使用計算屬性值的方式來透過 props 決定要使用哪種 redux action

const DeleteModal = ({ dataType }) => {
  const dispatch = useDispatch();
  const isModalOpen = deleteForWhat(dataType).isModalOpen;
  const deleteDataAction = deleteForWhat(dataType).deleteAction;
  const deleteItem = useSelector(deleteForWhat(dataType).deleteItem);
  const { id, title } = deleteItem;

  const onCloseModalHandler = () => {
    dispatch(isModalOpen(false));
  };

  const onDeleteHandler = () => {
    dispatch(deleteDataAction(id));
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal__header">
        <h1 className="delete-modal__header-title">刪除確認</h1>
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.squareBlackSm}
          aria-label="Close"
          onClick={onCloseModalHandler}
        >
          ｘ
        </Button>
      </div>
      <div className="delete-modal__body">
        確定刪除 {dataType === "adminOrder" ? id : title}？
      </div>
      <div className="delete-modal__footer">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
          onClick={onCloseModalHandler}
        >
          取消
        </Button>
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
          onClick={() => onDeleteHandler(id)}
        >
          確認刪除
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
