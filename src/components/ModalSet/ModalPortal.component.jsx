import { useEffect } from "react";
import { createPortal } from "react-dom";

// import Modal from "./Modal.component";
import { Modal } from "bootstrap";

const portalElement = document.getElementById("overlays");

const ModalPortal = ({ children }) => {
  //   useEffect(() => {
  //     Modal.current = new Modal("#testModal", {
  //       backdrop: "static",
  //     });
  //   }, []);
  //todo 把 modal migrated
  return (
    <>
      {createPortal(
        <div
          className="modal fade"
          tabIndex="-1"
          id="testModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {children}
        </div>,
        portalElement
      )}
    </>
  );
};

export default ModalPortal;
