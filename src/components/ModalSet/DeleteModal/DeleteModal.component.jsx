//* parent component：
//* 1. ModalPortal.component.jsx

import { useDispatch, useSelector } from "react-redux";
import {
  setAdminProductModalOpen,
  deleteAdminProductAsync,
} from "../../../store/adminProduct/adminProduct.actions";
import { selectAdminProductTempData } from "../../../store/adminProduct/adminProduct.selector";

import {
  setAdminCouponsOpen,
  deleteAdminCouponsAsync,
} from "../../../store/adminCoupons/adminCoupons.actions";
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
      isModalOpen: "",
      deleteAction: "",
      deleteItem: "",
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
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h1 className="modal-title text-white fs-5" id="exampleModalLabel">
              刪除確認
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCloseModalHandler}
            />
          </div>
          <div className="modal-body">刪除 {title}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModalHandler}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDeleteHandler(id)}
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
