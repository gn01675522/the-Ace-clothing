import { NavLink, useMatch } from "react-router-dom";
import "./CategoryCard.styles.scss";

const CategoryCard = ({ category, index }) => {
  const { title, url, path } = category;
  const cardNumber = index + 1;
  const match = useMatch("admin/products");

  return (
    <NavLink
      to={match ? path.admin : path.user}
      className={`category-card category-card-${cardNumber}`}
    >
      <img
        src={url}
        className="category-card__img"
        alt={`category card: ${title}`}
      />
      <div className="category-card__content">
        <h3 className="category-card__content-title">{title}</h3>
      </div>
    </NavLink>
  );
};

export default CategoryCard;
