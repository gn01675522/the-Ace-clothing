import "./Home.styles.scss";

import Banner from "../../../components/Banner/Banner.component";
import Categories from "../../../components/Categories/Categories.component";

const Home = () => {
  return (
    <>
      <div className="home">
        <Banner />
        <div className="home__categories">
          <h1 className="home__title">SHOP NOW</h1>
          <Categories />
        </div>
        <div>
          <h1 className="home__title">HOT</h1>
        </div>
        <div>
          <h1 className="home__title">HOT</h1>
        </div>
        <div>
          <h1 className="home__title">HOT</h1>
        </div>
        <div>
          <h1 className="home__title">HOT</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
