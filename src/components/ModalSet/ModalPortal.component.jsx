import { createPortal } from "react-dom";

import ModalBackdrop from "./ModalBackdrop/ModalBackdrop.component";
import ProductModal from "./ProductModal/ProductModal.component";
import DeleteModal from "./DeleteModal/DeleteModal.component";
import CouponModal from "./CouponModal/CouponModal.component";
import OrderModal from "./OrderModal/OrderModal.component";
import DeleteInCartModal from "./DeleteInCartModal/DeleteInCartModal.component";

const portalElement = document.getElementById("overlays");

export const MODAL_TYPE = {
  product: "product",
  coupon: "coupon",
  order: "order",
  delete: "delete",
  deleteInCart: "deleteInCart",
};

const modalSwitch = (modalType) =>
  ({
    [MODAL_TYPE.product]: ProductModal,
    [MODAL_TYPE.coupon]: CouponModal,
    [MODAL_TYPE.order]: OrderModal,
    [MODAL_TYPE.delete]: DeleteModal,
    [MODAL_TYPE.deleteInCart]: DeleteInCartModal,
  }[modalType]);

const ModalPortal = ({ openWhichModal, backdropClose, ...otherProps }) => {
  const Modal = modalSwitch(openWhichModal);

  return (
    <>
      {createPortal(
        <ModalBackdrop backdropClose={backdropClose}>
          <Modal {...otherProps} />
        </ModalBackdrop>,
        portalElement
      )}
    </>
  );
};

export default ModalPortal;
