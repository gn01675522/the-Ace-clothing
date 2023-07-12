import "./Button.styles.scss";

export const BUTTON_TYPE_CLASS = {
  rectBlackNm: "rect-black-nm",
  rectBlackMe: "rect-black-me",
  rectBlackSm: "rect-black-sm",
  rectWhiteLg: "rect-white-lg",
  rectWhiteNm: "rect-white-nm",
  rectWhiteSm: "rect-white-sm",
  rectWhiteBdLg: "rect-white-bd-lg",
  rectWhiteOpacityLSm: "rect-white-ppacity-l-sm",
  rectWhiteOpacityRSm: "rect-white-opacity-r-sm",
  squareBlackMe: "square-black-me",
  squareBlackSm: "square-black-sm",
  squareWhiteSm: "square-white-sm",
  arcBlackLg: "arc-black-lg",
  arcWhiteOpacityLSm: "arc-white-opacity-l-sm",
  arcWhiteOpacityRSm: "arc-white-opacity-r-sm",
};

const getClass = (buttonType) =>
  ({
    [BUTTON_TYPE_CLASS.rectBlackNm]: "btn-rect-bl-nm",
    [BUTTON_TYPE_CLASS.rectBlackMe]: "btn-rect-bl-me",
    [BUTTON_TYPE_CLASS.rectBlackSm]: "btn-rect-bl-Sm",
    [BUTTON_TYPE_CLASS.rectWhiteLg]: "btn-rect-wh-lg",
    [BUTTON_TYPE_CLASS.rectWhiteNm]: "btn-rect-wh-nm",
    [BUTTON_TYPE_CLASS.rectWhiteSm]: "btn-rect-wh-sm",
    [BUTTON_TYPE_CLASS.rectWhiteBdLg]: "btn-rect-wh-bd",
    [BUTTON_TYPE_CLASS.rectWhiteOpacityLSm]: "btn-sq-wh-opacity-l-sm",
    [BUTTON_TYPE_CLASS.rectWhiteOpacityRSm]: "btn-sq-wh-opacity-r-sm",
    [BUTTON_TYPE_CLASS.squareBlackMe]: "btn-sq-bl-me",
    [BUTTON_TYPE_CLASS.squareBlackSm]: "btn-sq-bl-sm",
    [BUTTON_TYPE_CLASS.squareWhiteSm]: "btn-sq-wh-sm",
    [BUTTON_TYPE_CLASS.arcBlackLg]: "btn-arc-bl-lg",
    [BUTTON_TYPE_CLASS.arcWhiteOpacityLSm]: "btn-arc-white-opacity-l-sm",
    [BUTTON_TYPE_CLASS.arcWhiteOpacityRSm]: "btn-arc-white-opacity-r-sm",
  }[buttonType]);

const Button = ({ buttonType, children, isLoading, ...otherProps }) => {
  const buttonClass = getClass(buttonType);

  return (
    <button disabled={isLoading} className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
