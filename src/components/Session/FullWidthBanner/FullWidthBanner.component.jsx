import { Link } from "react-router-dom";
import "./FullWidthBanner.styles.scss";

import { SESSION_CONTENT_DATA } from "../session.data.js";

const FullWidthBanner = ({ type }) => {
  const data = SESSION_CONTENT_DATA.fullWidthBanner[type];
  const { title, sentence, img, link } = data;

  return (
    <div className="full-width-banner">
      <img
        className="full-width-banner__img"
        src={img}
        alt={`banner: ${title}`}
      />
      <section className="full-width-banner__content">
        <h2 className="full-width-banner__content-title">{title}</h2>
        <p className="full-width-banner__content-sentence">{sentence}</p>
        <Link className="full-width-banner__content-link" to={link}>
          選購
        </Link>
      </section>
    </div>
  );
};

export default FullWidthBanner;
