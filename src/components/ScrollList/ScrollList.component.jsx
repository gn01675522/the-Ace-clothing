import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScrollList.styles.scss";

import ScrollItem from "../ScrollItem/ScrollItem.component";

import { fetchUserProductAsync } from "../../store/userProduct/userProduct.actions";
import {
  selectUserMensProducts,
  selectUserWomensProducts,
} from "../../store/userProduct/userProduct.selector";

export const SCROLL_TYPE = {
  newArrival: "newArrival",
  hot: "hot",
};

const scrollList = (type) =>
  ({
    [SCROLL_TYPE.newArrival]: selectUserMensProducts,
    [SCROLL_TYPE.hot]: selectUserWomensProducts,
  }[type]);

const ScrollList = ({ type }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDistance, setStartDistance] = useState(null);
  const [draggingProgress, setDraggingProgress] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(scrollList(type));
  const contentRef = useRef();
  let keepTrigger = null;

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
  //* 按鈕滾動卷軸

  const onStopScroll = () => {
    if (keepTrigger !== null) {
      clearTimeout(keepTrigger);
      keepTrigger = null;
    }
  };
  //* 清空 setTimeout 及 keepTrigger

  const onCheckIsDrag = (e) => {
    setStartDistance(e.clientX);
    setIsDragging(true);
  };

  const onDragHandler = (e) => {
    if (!isDragging) return;
    setDraggingProgress(true);
    const distance = startDistance - e.clientX;
    const container = contentRef.current;
    container.scrollBy({
      left: distance,
      behavior: "auto",
    });

    setStartDistance(e.clientX);
  };

  const onCancelDrag = () => {
    setIsDragging(false);
    setDraggingProgress(false);
  };

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, []);

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
      <button
        type="button"
        className="scroll-list__prev"
        onMouseDown={() => onScrollHandler("prev")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
      />
      <button
        type="button"
        className="scroll-list__next"
        onMouseDown={() => onScrollHandler("next")}
        onMouseUp={onStopScroll}
        onMouseLeave={onStopScroll}
      />
    </div>
  );
};

export default ScrollList;
