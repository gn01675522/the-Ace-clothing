// parent component：
// 1. Dashboard.component.jsx
// 2. ProductDetail.component.jsx
// 3. Cart.component.jsx

import { useSelector } from "react-redux";
import { selectMessage } from "../../store/message/message.selector";

import "./Message.styles.scss";

const Message = () => {
  const message = useSelector(selectMessage);
  const { type, title, text } = message;

  return (
    <>
      <div className="message">
        <div className={`message__header message__header--${type}`}>
          <strong className="message__header-title">{title}</strong>
        </div>
        <div className="message__body">
          <div className="message__body-content">
            <span>{text}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
