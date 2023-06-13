import { Link } from "react-router-dom";
import "./ScrollItem.styles.scss";

const ScrollItem = ({ product, urlParam,isDragging }) => {
  return (
    <Link
      to={`/${urlParam}/${product.id}`}
      className={`scroll-item scroll-item${isDragging? "--dragging":""}`}
      draggable="false"
    >
      <div className="scroll-item__preview">
        <img
          src={product.imageUrl}
          className="scroll-item__preview-img"
          alt={product.title}
        />
      </div>
      <div className="scroll-item__info">
        <h4 className="scroll-item__info-title">{product.title}</h4>
        <div className="scroll-item__info-price">
          <p className="scroll-item__info-price-sale">NT$ {product.price}</p>
          <p className="scroll-item__info-price-original product-on-sale">
            NT$ {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};
// todo 須完成折扣功能
export default ScrollItem;
