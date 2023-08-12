import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Banner.styles.scss";

import Indicator from "../UI/Indicator/Indicator.component";
import Button, { BUTTON_TYPE_CLASS } from "../UI/Button/Button.component";

import { BANNER_DATA } from "./Banner.data.js";

import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg";

const Banner = () => {
  const [imgNum, setImgNum] = useState(0);

  const onClickToChangeBanner = (type) => {
    switch (type) {
      case "prev":
        if (imgNum === 0) {
          setImgNum(BANNER_DATA.length - 1);
        } else {
          setImgNum(imgNum - 1);
        }
        break;
      case "next":
        if (imgNum === BANNER_DATA.length - 1) {
          setImgNum(0);
        } else {
          setImgNum(imgNum + 1);
        }
        break;
      default:
        return;
    }
  };

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
      <Button
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onClick={() => onClickToChangeBanner("prev")}
      >
        <LeftArrow className="banner__left-arrow" />
      </Button>
      <Button
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onClick={() => onClickToChangeBanner("next")}
      >
        <RightArrow className="banner__right-arrow" />
      </Button>
      <img
        className="banner__image"
        src={BANNER_DATA[imgNum].img}
        alt="banner images"
      />
      <Indicator
        imgCount={BANNER_DATA.length}
        imgNum={imgNum}
        onChangeImg={onChangeImg}
      />
      <Link className="banner__cta" to={BANNER_DATA[imgNum].url}>
        {BANNER_DATA[imgNum].text}
      </Link>
    </div>
  );
};

export default Banner;
