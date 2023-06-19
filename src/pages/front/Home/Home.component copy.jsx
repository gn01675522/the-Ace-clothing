import { useState, useEffect, useRef, useCallback } from "react";
import "./Home.styles.scss";

import Banner from "../../../components/Banner/Banner.component";
import Categories from "../../../components/Categories/Categories.component";
import ScrollList from "../../../components/ScrollList/ScrollList.component";
import FullWidthBanner from "../../../components/Session/FullWidthBanner/FullWidthBanner.component";
import SplitBanner from "../../../components/Session/SplitBanner/SplitBanner.component";

import { SCROLL_TYPE } from "../../../components/ScrollList/ScrollList.component";

const Home = () => {
  const [firstBannerDetect, setFirstBannerDetect] = useState(false);
  const [thirdBannerDetect, setThirdBannerDetect] = useState(false);
  const firstBannerRef = useRef(null);
  const thirdBannerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;

    const firstBannerHeight = firstBannerRef.current.offsetHeight;
    const thirdBannerHeight = thirdBannerRef.current.offsetHeight;

    const firstBannerTopPosition = firstBannerRef.current.offsetTop;
    const thirdBannerTopPosition = thirdBannerRef.current.offsetTop;

    const firstBannerBottomPosition =
      firstBannerTopPosition + firstBannerHeight;
    const thirdBannerBottomPosition =
      thirdBannerTopPosition + thirdBannerHeight;

    if (
      firstBannerTopPosition <= windowBottomPosition &&
      firstBannerBottomPosition >= windowTopPosition
    ) {
      if (!firstBannerDetect) {
        console.log("test");
        setFirstBannerDetect(true);
      } else {
        setFirstBannerDetect(false);
      }
    }
    if (
      thirdBannerTopPosition <= windowBottomPosition &&
      thirdBannerBottomPosition >= windowTopPosition
    ) {
      if (!thirdBannerDetect) {
        console.log("test second");
        setThirdBannerDetect(true);
      } else {
        setThirdBannerDetect(false);
      }
    }
  }, [firstBannerDetect, thirdBannerDetect]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
        <div className="home__session" ref={firstBannerRef}>
          <SplitBanner type="women" inView={firstBannerDetect ? true : false} />
        </div>
        <div className="home__session">
          <FullWidthBanner type="boho" />
        </div>
        <div className="home__session" ref={thirdBannerRef}>
          <SplitBanner type="men" inView={thirdBannerDetect ? true : false} />
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
