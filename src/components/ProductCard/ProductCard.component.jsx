import { Link } from "react-router-dom";
import "./ProductCard.styles.scss";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="products-card"
      key={product.id}
    >
      <div className="products-card__preview">
        <img
          src={product.imageUrl}
          className="products-card__img"
          height={300}
          alt="..."
        />
      </div>
      <div className="products-card__info">
        <h4 className="products-card__info-title">{product.title}</h4>
        <p className="products__card-info-price">NT$ {product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
