import { Link } from "react-router-dom";
import "./SplitBanner.styles.scss";

import { SESSION_CONTENT_DATA } from "../session.data";

const SplitBanner = ({ type }) => {
  const data = SESSION_CONTENT_DATA.splitBanner[type];
  const { title, sentence, img, link } = data;
  const btnContent = `GO ${type.toUpperCase()}'s' SHOP`;

  return (
    <div
      className={`split-banner split-banner${type === "men" ? "__men" : ""}`}
    >
      <div className="split-banner__left">
        <h2 className="split-banner__left-title">{title}</h2>
        <p className="split-banner__left-sentence">{sentence}</p>
        <Link className="split-banner__left-btn" to={link}>
          {btnContent}
        </Link>
      </div>
      <div className="split-banner__right">
        <Link to={link}>
          <img className="split-banner__right-img" src={img} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default SplitBanner;
