//* Parent component：
//* 1. ModalPortal.component.jsx

import "./ModalBackdrop.styles.scss";

const ModalBackdrop = ({ children }) => {
  return (
    <>
      <div className="modal__backdrop">
        <div className="modal">{children}</div>
      </div>
    </>
  );
};

export default ModalBackdrop;
