import { Link } from "react-router-dom";
import "./Footer.styles.scss";

import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as Line } from "../../assets/line.svg";
import { ReactComponent as Instagram } from "../../assets/instagram.svg";

import { FOOTER_DATA } from "./footer.data";

const SYMBOL_TYPE = {
  facebook: "Facebook",
  instagram: "Instagram",
  line: "Line",
};

const symbol = (type) =>
  ({
    [SYMBOL_TYPE.facebook]: <Facebook className="facebook-icon" />,
    [SYMBOL_TYPE.instagram]: <Instagram className="instagram-icon" />,
    [SYMBOL_TYPE.line]: <Line className="line-icon" />,
  }[type]);

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__copyright">
        © 本網站為個人練習作品，無作任何商業用途使用。
      </p>
      <div className="footer__content">
        {FOOTER_DATA.map((data) => (
          <ul className="footer__content-ul" key={data.title}>
            <li className="footer__content-ul-title">{data.title}</li>

            {data.items.map((item) => (
              <li className="footer__content-items" key={item.title}>
                {item.link ? (
                  <Link to={item.link}>
                    <span>{item.title}</span>
                  </Link>
                ) : item.number ? (
                  <div>
                    {item.title} <br />
                    {item.number}
                  </div>
                ) : (
                  <Link
                    className="footer__content-items-link"
                    to={item.website}
                    target="_blank"
                  >
                    <span>
                      {symbol(item.title)}
                      {item.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Footer;
