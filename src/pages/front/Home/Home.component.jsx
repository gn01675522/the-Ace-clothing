import "./Home.styles.scss";

import Banner from "../../../components/Banner/Banner.component";
import Categories from "../../../components/Categories/Categories.component";
import ScrollList from "../../../components/ScrollList/ScrollList.component";
import FullWidthBanner from "../../../components/Session/FullWidthBanner/FullWidthBanner.component";
import SplitBanner from "../../../components/Session/SplitBanner/SplitBanner.component";

import { SCROLL_TYPE } from "../../../components/ScrollList/ScrollList.component";

const Home = () => {
  return (
    <>
      <div className="home">
        <Banner />
        <div className="home__session">
          <h1 className="home__session-title">SHOP NOW</h1>
          <Categories />
        </div>
        <div className="home__session">
          <h1 className="home__session-title">NEW ARRIVALS</h1>
          <ScrollList type={SCROLL_TYPE.newArrival} />
        </div>
        <div className="home__session">
          <SplitBanner type="women" />
        </div>
        <div className="home__session">
          <FullWidthBanner type="boho" />
        </div>
        <div className="home__session">
          <SplitBanner type="men" />
        </div>
        <div className="home__session">
          <FullWidthBanner type="urban" />
        </div>
        <div className="home__session">
          <h1 className="home__session-title">HOT</h1>
          <ScrollList type={SCROLL_TYPE.hot} />
        </div>
      </div>
    </>
  );
};

export default Home;
