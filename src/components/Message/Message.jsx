// parent component：
// 1. Dashboard.component.jsx
// 2. ProductDetail.component.jsx

import { useSelector } from "react-redux";
import { selectMessage } from "../../store/message/message.selector";

const Message = () => {
  const message = useSelector(selectMessage);
  const { type, title, text } = message;

  return (
    <>
      <div
        className="toast-container position-fixed"
        style={{ top: "64px", right: "15px" }}
      >
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="3000"
        >
          <div className={`toast-header text-white bg-${type}`}>
            <strong className="me-auto">{title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
          <div className="toast-body">{text}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
