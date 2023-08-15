//* Parent component：
//* 1. ModalPortal.component.jsx

import "./ModalBackdrop.styles.scss";

const ModalBackdrop = ({ children, backdropClose }) => {
  return (
    <>
      <div className="modal__backdrop" onClick={backdropClose}>
        <div className="modal">{children}</div>
      </div>
    </>
  );
};

export default ModalBackdrop;
