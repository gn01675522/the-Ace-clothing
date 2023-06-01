import "./Home.styles.scss";

import Banner from "../../../components/Banner/Banner.component";
import Categories from "../../../components/Categories/Categories.component";
import ScrollList from "../../../components/ScrollList/ScrollList.component";

const Home = () => {
  return (
    <>
      <div className="home">
        <Banner />
        <div className="home__topic">
          <h1 className="home__topic-title">SHOP NOW</h1>
          <Categories />
        </div>
        <div className="home__topic">
          <h1 className="home__topic-title">NEW ARRIVALS</h1>
          <ScrollList />
        </div>
        <div className="home__topic">
          <h1 className="home__topic-title">HOT</h1>
        </div>
        <div className="home__topic">
          <h1 className="home__topic-title">HOT</h1>
        </div>
        <div className="home__topic">
          <h1 className="home__topic-title">HOT</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
