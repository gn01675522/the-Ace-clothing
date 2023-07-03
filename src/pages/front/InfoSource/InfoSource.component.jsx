import { Link } from "react-router-dom";
import "./InfoSource.styles.scss";

import { ReactComponent as AceLogo } from "../../../assets/ace.svg";
import { ReactComponent as LineIcon } from "../../../assets/line.svg";
import { ReactComponent as InstagramIcon } from "../../../assets/instagram.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/facebook.svg";
import { ReactComponent as CartIcon } from "../../../assets/cart.svg";
import { ReactComponent as NoImage } from "../../../assets/noImage.svg";
import { ReactComponent as WhiteHeart } from "../../../assets/whiteHeart.svg";
import { ReactComponent as RedHeart } from "../../../assets/redHeart.svg";
import hexSchool from "../../../assets/hexSchool.png";

import { INFO_SOURCE_DATA } from "./infoSource.data";

const { logos, icons, pictures, apis } = INFO_SOURCE_DATA;

const INFO_CATEGORY = [
  { category: "logos", data: logos },
  { category: "icons", data: icons },
  { category: "pictures", data: pictures },
  { category: "apis", data: apis },
];

const CATEGORY_TYPE = {
  logos: "logos",
  icons: "icons",
  pictures: "pictures",
  apis: "apis",
};

const attachment = (category) =>
  ({
    [CATEGORY_TYPE.logos]: [<AceLogo className="info-source__card-view-img" />],
    [CATEGORY_TYPE.icons]: [
      <CartIcon className="info-source__card-view-img" />,
      <InstagramIcon className="info-source__card-view-img" />,
      <FacebookIcon className="info-source__card-view-img" />,
      <LineIcon className="info-source__card-view-img" />,
      <RedHeart className="info-source__card-view-img" />,
      <WhiteHeart className="info-source__card-view-img" />,
    ],
    [CATEGORY_TYPE.pictures]: [
      "https://images.unsplash.com/photo-1611162618828-bc409f073cbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      <NoImage className="info-source__card-view-img" />,
    ],
    [CATEGORY_TYPE.apis]: [hexSchool],
  }[category]);

const InfoSource = () => {
  return (
    <div className="info-source">
      <h1 className="info-source__title">網站資料來源</h1>
      {INFO_CATEGORY.map((item) => (
        <div className="info-source__content" key={item.category}>
          <h2 className="info-source__content-title">{item.category} 出處</h2>
          <div className="info-source__content-main">
            {item.data.map((data, i) => {
              const AttachmentImg = attachment(item.category)[i];
              return (
                <div className="info-source__card" key={data.title}>
                  <div className="info-source__card-content">
                    <div>
                      <span>名稱：</span>
                      <h3 className="info-source__card-title">{data.title}</h3>
                    </div>

                    <div>
                      <span>作者：</span>
                      <Link to={data.url} target="_blank">
                        <h3 className="info-source__card-author">
                          {data.createBy}
                        </h3>
                      </Link>
                    </div>
                    <div>
                      <span>來源：</span>
                      <Link to={data.source.url}>
                        <h3 className="info-source__card-source">
                          {data.source.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <div className="info-source__card-view">
                    {typeof AttachmentImg === "string" ? (
                      <img
                        src={AttachmentImg}
                        alt=""
                        className="info-source__card-view-img"
                      />
                    ) : (
                      AttachmentImg
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoSource;
