import "./Home.styles.scss";

import Banner from "../../../components/Banner/Banner.component";
import Categories from "../../../components/Categories/Categories.component";

const Home = () => {
  return (
    <>
      <div className="home">
        <Banner />
        <Categories />
      </div>
    </>
  );
};

export default Home;
