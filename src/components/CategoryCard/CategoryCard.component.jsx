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
      <img src={url} alt="" className="category-card__img" />
      <div className="category-card__content">
        <h2 className="category-card__content-title">{title}</h2>
      </div>
    </NavLink>
  );
};

export default CategoryCard;
