import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";

import { useSelector } from "react-redux";
import { selectMessage } from "../../store/message/message.selector";

import "./Message.styles.scss";

const MESSAGE_TYPE = {
  success: "success",
  danger: "danger",
};

const getIcon = (type) =>
  ({
    [MESSAGE_TYPE.success]: Check,
    [MESSAGE_TYPE.danger]: Cross,
  }[type]);

const Message = () => {
  const message = useSelector(selectMessage);
  const { type, text } = message;
  const MessageIcon = getIcon(type);

  return (
    <>
      <div className="message">
        <div className="message__header">
          <MessageIcon className="message__header-icon" />
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
