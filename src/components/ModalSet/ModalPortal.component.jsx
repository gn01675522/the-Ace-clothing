import { createPortal } from "react-dom";

import ModalBackdrop from "./ModalBackdrop/ModalBackdrop.component";
import ProductModal from "./ProductModal/ProductModal.component";
import DeleteModal from "./DeleteModal/DeleteModal.component";
import CouponModal from "./CouponModal/CouponModal.component";
import OrderModal from "./OrderModal/OrderModal";

const portalElement = document.getElementById("overlays");

export const MODAL_TYPE = {
  product: "product",
  coupon: "coupon",
  order: "order",
  delete: "delete",
};

const modalSwitch = (modalType) =>
  ({
    [MODAL_TYPE.product]: ProductModal,
    [MODAL_TYPE.coupon]: CouponModal,
    [MODAL_TYPE.order]: OrderModal,
    [MODAL_TYPE.delete]: DeleteModal,
  }[modalType]);

const ModalPortal = ({ openWhichModal, ...otherProps }) => {
  const Modal = modalSwitch(openWhichModal);
  return (
    <>
      {createPortal(
        <ModalBackdrop>
          <Modal {...otherProps} />
        </ModalBackdrop>,
        portalElement
      )}
    </>
  );
};

export default ModalPortal;
