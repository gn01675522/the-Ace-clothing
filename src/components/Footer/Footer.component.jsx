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
    <footer className="footer">
      <p className="footer__copyright">
        © 本網站為個人練習作品，無作任何商業用途使用；原始碼請見{" "}
        <Link
          className="footer__copyright-link"
          to="https://github.com/gn01675522/the-Ace-clothing"
        >
          Github
        </Link>
        。
      </p>
      <div className="footer__content">
        {FOOTER_DATA.map((data) => (
          <ul className="footer__content-ul" key={data.title}>
            <li className="footer__content-ul-title">{data.title}</li>

            {data.items.map((item) => (
              <li className="footer__content-items" key={item.title}>
                {item.link ? (
                  <Link to={item.link}>
                    <div>{item.title}</div>
                  </Link>
                ) : item.number ? (
                  <div>
                    {item.title} <br />
                    {item.number}
                  </div>
                ) : (
                  <Link to={item.website} target="_blank">
                    <div>
                      {symbol(item.title)}
                      {item.title}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
