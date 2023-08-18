import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScrollList.styles.scss";

import ScrollItem from "../ScrollItem/ScrollItem.component";
import Button, { BUTTON_TYPE_CLASS } from "../UI/Button/Button.component";

import { fetchUserProductAsync } from "../../store/userProduct/userProduct.asyncThunk";
import {
  selectNewUserProducts,
  selectUserProductsOnSale,
} from "../../store/userProduct/userProduct.selector";

import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg";

import { computedWidthByContainerHelper } from "./ScrollList.helpers";

import { selectUserFavorite } from "../../store/user/user.selector";

export const SCROLL_TYPE = {
  newArrival: "newArrival",
  onSale: "onSale",
};

const scrollList = (type) =>
  ({
    [SCROLL_TYPE.newArrival]: selectNewUserProducts,
    [SCROLL_TYPE.onSale]: selectUserProductsOnSale,
  }[type]);

const ScrollList = ({ type }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDistance, setStartDistance] = useState(null);
  const [draggingProgress, setDraggingProgress] = useState(false);
  const [listContainerWidth, setListContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(scrollList(type));
  const contentRef = useRef();
  const listContainerRef = useRef();
  const setWidthByListContainer = computedWidthByContainerHelper(
    windowWidth,
    listContainerWidth
  );
  const wishlist = useSelector(selectUserFavorite);

  let keepTrigger = null;

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, [dispatch]);

  useEffect(() => {
    const updateListContainerWidth = () => {
      if (listContainerRef) {
        setListContainerWidth(listContainerRef.current.offsetWidth);
      }
    };

    updateListContainerWidth();

    window.addEventListener("resize", updateListContainerWidth);

    return () => {
      window.removeEventListener("resize", updateListContainerWidth);
    };
  }, []);

  useEffect(() => {
    const screenWidth = () => {
      if (window.innerWidth) {
        setWindowWidth(window.innerWidth);
      }
    };

    screenWidth();

    window.addEventListener("resize", screenWidth);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  // selector 變動時則將 wishlist 內容放入 localStorage 裡面

  const onScrollHandler = (type) => {
    const container = contentRef.current;
    const moveRange = setWidthByListContainer + 16;

    if (container) {
      container.scrollBy({
        left: type === "prev" ? -moveRange : moveRange,
        behavior: "smooth",
      });
    }
  };
  //* 使用按鈕滾動卷軸

  const onStopScroll = () => {
    if (keepTrigger !== null) {
      clearTimeout(keepTrigger);
      keepTrigger = null;
    }
  };
  //* 清空 setTimeout 及 keepTrigger

  const onCheckIsDrag = useCallback((e) => {
    setStartDistance(e.pageX);
    setIsDragging(true);
  }, []);
  //* 判斷 user 是否在列表當中常按滑鼠，是的話將記錄滑鼠起始座標，並將 isDragging 設定為 true

  const onCancelDrag = useCallback(() => {
    setIsDragging(false);
    setDraggingProgress(false);
  }, []);
  //* 如果 user 從拖曳狀態放開滑鼠，則判斷為結束拖曳，故將相關狀態設定為 false

  const onDragHandler = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      setDraggingProgress(true);
      const distance = startDistance - e.pageX;
      const container = contentRef.current;
      container.scrollBy({
        left: distance,
        behavior: "auto",
      });

      setStartDistance(e.clientX);
    },
    [isDragging, startDistance]
  );
  //* 如果 isDragging 為 false，也就是 user 沒有在做拖動動作則 return；反之則開始列表移動，移動的根據為起始位置減目前位置

  return (
    <div className="scroll-list" ref={listContainerRef}>
      <div className="scroll-list__content" ref={contentRef}>
        <div
          className="scroll-list__content-list"
          onMouseDown={(e) => onCheckIsDrag(e)}
          onMouseMove={(e) => onDragHandler(e)}
          onMouseUp={onCancelDrag}
          onMouseLeave={onCancelDrag}
        >
          {products.map((product) => {
            const category = product.category.split("-")[0];
            return (
              <ScrollItem
                product={product}
                urlParam={category}
                key={product.id}
                isDragging={draggingProgress}
                isFavorite={wishlist.includes(product.id)}
                style={{ width: `${setWidthByListContainer}px` }}
              />
            );
          })}
        </div>
      </div>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onMouseDown={() => onScrollHandler("prev")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
        title="previous"
      >
        <LeftArrow className="scroll-list__left-arrow" />
      </Button>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacitySm}
        onMouseDown={() => onScrollHandler("next")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
        title="next"
      >
        <RightArrow className="scroll-list__right-arrow" />
      </Button>
    </div>
  );
};

export default ScrollList;
