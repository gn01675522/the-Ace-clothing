import { useState, useEffect, useRef } from "react";
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
  const scrollDetectParentRef = useRef(null);
  const firstBannerRef = useRef(null);
  const thirdBannerRef = useRef(null);

  useEffect(() => {
    const firstBanner = firstBannerRef.current;
    const thirdBanner = thirdBannerRef.current;

    const firstBannerDetector = new IntersectionObserver(
      ([entry]) => setFirstBannerDetect(entry.isIntersecting),
      {
        root: null,
        threshold: 0.1,
      }
    );
    const thirdBannerDetect = new IntersectionObserver(
      ([entry]) => setThirdBannerDetect(entry.isIntersecting),
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (firstBanner) {
      firstBannerDetector.observe(firstBanner);
    }
    if (thirdBanner) {
      thirdBannerDetect.observe(thirdBanner);
    }
    return () => {
      if (firstBanner) {
        firstBannerDetector.unobserve(firstBanner);
      }
      if (thirdBanner) {
        thirdBannerDetect.unobserve(thirdBanner);
      }
    };
  }, []);

  return (
    <>
      <div className="home" ref={scrollDetectParentRef}>
        <Banner />
        <div className="home__discount">
          <h2>Grand Opening Sale</h2>
          <h1>EXTRA 30% OFF SALE</h1>
          <p>
            慶祝您我的相遇，也歡迎您加入我們的旅程，輸入 newBeginning
            即可享全品項 7 折優惠！
          </p>
        </div>
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
          <h1 className="home__session-title">ON SALE</h1>
          <ScrollList type={SCROLL_TYPE.onSale} />
        </div>
      </div>
    </>
  );
};

export default Home;
