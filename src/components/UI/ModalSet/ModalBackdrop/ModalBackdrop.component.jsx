//* Parent component： 
//* 1. ModalPortal.component.jsx

import classes from "./ModalBackdrop.styles.module.scss";

const ModalBackdrop = ({ children }) => {
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

export default ModalBackdrop;
