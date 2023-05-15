import { Link } from "react-router-dom";
import "./ProductCard.styles.scss";

const ProductCard = ({ product, urlParam }) => {
  return (
    <Link to={`/products/${urlParam}/${product.id}`} className="products-card">
      <div className="products-card__preview">
        <img src={product.imageUrl} className="products-card__img" alt="..." />
      </div>
      <div className="products-card__info">
        <h4 className="products-card__info-title">{product.title}</h4>
        <p className="products__card-info-price">NT$ {product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
