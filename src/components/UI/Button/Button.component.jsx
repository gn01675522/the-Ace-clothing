import "./Button.styles.scss";

export const BUTTON_TYPE_CLASS = {
  closeSm: "close-sm",
  closeNm: "close-nm",
  save: "save",
  edit: "edit",
  del: "del",
  add: "add",
  addTwo: "add-two",
  addImg: "add-img",
  removeSm: "removeSm",
  removeNm: "removeNm",
  logout: "logout",
  send: "send",
  back: "back",
  search: "search",
  plus: "plus",
  minor: "minor",
  addCart: "addCart",
  prevLg: "prevLg",
  nextLg: "nextLg",
  btnNm: "btnNm",
  login: "login",
};

const getClass = (buttonType) =>
  ({
    [BUTTON_TYPE_CLASS.closeSm]: "btn-close-sm",
    [BUTTON_TYPE_CLASS.closeNm]: "btn-close-nm",
    [BUTTON_TYPE_CLASS.save]: "btn-save",
    [BUTTON_TYPE_CLASS.edit]: "btn-edit",
    [BUTTON_TYPE_CLASS.del]: "btn-del",
    [BUTTON_TYPE_CLASS.add]: "btn-add",
    [BUTTON_TYPE_CLASS.addTwo]: "btn-add-two",
    [BUTTON_TYPE_CLASS.addImg]: "btn-add-img",
    [BUTTON_TYPE_CLASS.removeSm]: "btn-remove-sm",
    [BUTTON_TYPE_CLASS.removeNm]: "btn-remove-nm",
    [BUTTON_TYPE_CLASS.logout]: "btn-logout",
    [BUTTON_TYPE_CLASS.send]: "btn-send",
    [BUTTON_TYPE_CLASS.back]: "btn-back",
    [BUTTON_TYPE_CLASS.search]: "btn-search",
    [BUTTON_TYPE_CLASS.plus]: "btn-plus",
    [BUTTON_TYPE_CLASS.minor]: "btn-minor",
    [BUTTON_TYPE_CLASS.addCart]: "btn-add-cart",
    [BUTTON_TYPE_CLASS.prevLg]: "btn-prev-lg",
    [BUTTON_TYPE_CLASS.nextLg]: "btn-next-lg",
    [BUTTON_TYPE_CLASS.btnNm]: "btn-nm",
    [BUTTON_TYPE_CLASS.login]: "btn-login",
  }[buttonType]);

const Button = ({ buttonType, children, isLoading, ...otherProps }) => {
  const buttonClass = getClass(buttonType);
  console.log(buttonClass);
  return (
    <button disabled={isLoading} className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
