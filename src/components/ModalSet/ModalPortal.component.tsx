import { FC } from "react";
import { createPortal } from "react-dom";

import ModalBackdrop from "./ModalBackdrop/ModalBackdrop.component";
import ProductModal from "./ProductModal/ProductModal.component";
import DeleteModal from "./DeleteModal/DeleteModal.component";
import CouponModal from "./CouponModal/CouponModal.component";
import OrderModal from "./OrderModal/OrderModal.component";
import DeleteInCartModal from "./DeleteInCartModal/DeleteInCartModal.component";

const portalElement = document.getElementById("overlays") as HTMLElement;
// 此為永存於 index.html 的一個結構，專門用來做 modal portal 用。

export enum MODAL_TYPE {
  product = "product",
  coupon = "coupon",
  order = "order",
  delete = "delete",
  deleteInCart = "deleteInCart",
}

const modalSwitch = (modalType: MODAL_TYPE): React.ComponentType<any> =>
  ({
    [MODAL_TYPE.product]: ProductModal,
    [MODAL_TYPE.coupon]: CouponModal,
    [MODAL_TYPE.order]: OrderModal,
    [MODAL_TYPE.delete]: DeleteModal,
    [MODAL_TYPE.deleteInCart]: DeleteInCartModal,
  }[modalType]);
// 透過 mapping 方式來 return 相對應的 component

type ModalPortalProps = {
  openWhichModal: MODAL_TYPE;
  backdropClose: string;
};

const ModalPortal: FC<ModalPortalProps> = ({
  openWhichModal,
  backdropClose,
  ...otherProps
}) => {
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
