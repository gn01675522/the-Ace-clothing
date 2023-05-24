import { useState, useEffect } from "react";
import "./Banner.styles.scss";

import Indicator from "../Indicator/Indicator.component";
import { IMAGES_URL } from "../../data/imagesUrl.data";

const bannerImages = IMAGES_URL.banner;

const Banner = () => {
  const [imgNum, setImgNum] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (imgNum === bannerImages.length - 1) {
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
      <img className="banner__image" src={bannerImages[imgNum]} alt="" />
      <Indicator
        imgCount={bannerImages.length}
        imgNum={imgNum}
        onChangeImg={onChangeImg}
      />
    </div>
  );
};

export default Banner;
