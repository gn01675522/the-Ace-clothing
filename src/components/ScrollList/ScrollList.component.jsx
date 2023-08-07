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
  const dispatch = useDispatch();
  const products = useSelector(scrollList(type));
  const contentRef = useRef();
  let keepTrigger = null;

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, [dispatch]);

  const onScrollHandler = (type) => {
    const delay = 5;
    const container = contentRef.current;
    if (container) {
      container.scrollBy({
        left: type === "prev" ? -2 : 2,
        behavior: "auto",
      });
      keepTrigger = setTimeout(() => onScrollHandler(type), delay);
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
    <div className="scroll-list">
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
              />
            );
          })}
        </div>
      </div>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacityLSm}
        onMouseDown={() => onScrollHandler("prev")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
        title="previous"
      />
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASS.arcWhiteOpacityRSm}
        onMouseDown={() => onScrollHandler("next")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
        title="next"
      />
    </div>
  );
};

export default ScrollList;
