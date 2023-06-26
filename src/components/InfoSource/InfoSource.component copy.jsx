import { Link } from "react-router-dom";
import "./InfoSource.styles.scss";

import { ReactComponent as AceLogo } from "../../assets/ace.svg";
import { ReactComponent as LineIcon } from "../../assets/line.svg";
import { ReactComponent as InstagramIcon } from "../../assets/instagram.svg";
import { ReactComponent as FacebookIcon } from "../../assets/facebook.svg";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import { ReactComponent as NoImage } from "../../assets/noImage.svg";

import { INFO_SOURCE_DATA } from "./infoSource.data";

const { logo, icons, picture } = INFO_SOURCE_DATA;

const INFO_CATEGORY = ["logo", "icons", "picture"];

const InfoSource = () => {
  return (
    <div className="info-source">
      <h1 className="info-source__title">網站資料來源</h1>

      <div className="info-source__content">
        <h2 className="info-source__content-title">網站 LOGO 出處</h2>
        {logo.map((item) => (
          <div className="info-source__card" key={item.title}>
            <div className="info-source__card-title">
              <h3>名稱：{item.title}</h3>
            </div>
            <div className="info-source__card-author">
              <Link to={item.url} target="_blank">
                作者：{item.createBy}
              </Link>
            </div>
            <div className="info-source__card-source">
              <Link to={item.source.url}>來源：{item.source.title}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="info-source__content">
        <h2 className="info-source__content-title">網站 ICONS 出處</h2>
        {icons.map((item) => (
          <div className="info-source__card" key={item.title}>
            <div className="info-source__card-title">
              <h3>名稱：{item.title}</h3>
            </div>
            <div className="info-source__card-author">
              <Link to={item.url} target="_blank">
                作者：{item.createBy}
              </Link>
            </div>
            <div className="info-source__card-source">
              <Link to={item.source.url}>來源：{item.source.title}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="info-source__content">
        <h2 className="info-source__content-title">網站圖片出處</h2>
        {picture.map((item) => (
          <div className="info-source__card" key={item.title}>
            <div className="info-source__card-title">
              <h3>名稱：{item.title}</h3>
            </div>
            <div className="info-source__card-author">
              <Link to={item.url} target="_blank">
                作者：{item.createBy}
              </Link>
            </div>
            <div className="info-source__card-source">
              <Link to={item.source.url}>來源：{item.source.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSource;
