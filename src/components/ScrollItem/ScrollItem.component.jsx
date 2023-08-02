import { Link } from "react-router-dom";
import "./ScrollItem.styles.scss";

import PriceTag from "../UI/PriceTag/PriceTag.component";

const ScrollItem = ({ product, urlParam, isDragging }) => {
  const { id, title, imageUrl, origin_price, price } = product;

  return (
    <Link
      to={`/${urlParam}/${id}`}
      className={`scroll-item scroll-item${isDragging ? "--dragging" : ""}`}
      draggable="false"
    >
      <div className="scroll-item__preview">
        <img
          src={imageUrl}
          className="scroll-item__preview-img"
          alt={`product in urlParam:${title}`}
        />
      </div>
      <div className="scroll-item__info">
        <h4 className="scroll-item__info-title">{title}</h4>
        <div className="scroll-item__info-price">
          <PriceTag origin_price={origin_price} price={price} />
        </div>
      </div>
    </Link>
  );
};

export default ScrollItem;
