import { useState, useEffect } from "react";
import "./Banner.styles.scss";

import Indicator from "../UI/Indicator/Indicator.component";
import { BANNER_DATA } from "./banner.data";

const Banner = () => {
  const [imgNum, setImgNum] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (imgNum === BANNER_DATA.length - 1) {
        setImgNum(0);
      } else {
        setImgNum(imgNum + 1);
      }
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [imgNum]);

  const onChangeImg = (i) => {
    setImgNum(i);
  };

  return (
    <div className="banner">
      <img className="banner__image" src={BANNER_DATA[imgNum]} alt="" />
      <Indicator
        imgCount={BANNER_DATA.length}
        imgNum={imgNum}
        onChangeImg={onChangeImg}
      />
    </div>
  );
};

export default Banner;
