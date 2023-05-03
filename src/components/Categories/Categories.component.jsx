import "./Categories.styles.scss";
import CategoryCard from "../CategoryCard/CategoryCard.component";

import { IMAGES_URL } from "../../data/imagesUrl";

const categories = IMAGES_URL.categories;

const Categories = () => {
  return (
    <div className="categories">
      {categories.map((category, i) => (
        <CategoryCard key={category.title} category={category} index={i} />
      ))}
    </div>
  );
};

export default Categories;
