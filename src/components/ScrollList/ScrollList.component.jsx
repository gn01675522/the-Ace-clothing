import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ScrollList.styles.scss";

import ScrollItem from "../ScrollItem/ScrollItem.component";

import { fetchUserProductAsync } from "../../store/userProduct/userProduct.actions";
import { selectUserMensProducts } from "../../store/userProduct/userProduct.selector";

const ScrollList = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDistance, setStartDistance] = useState(null);
  const [draggingProgress, setDraggingProgress] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectUserMensProducts);
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
    const dragDistance =
      window.innerWidth < 768 ? 5 : window.innerWidth < 1024 ? 10 : 30;
    const distance = startDistance - e.clientX;
    const container = contentRef.current;
    container.scrollBy({
      left: distance > 0 ? dragDistance : -dragDistance,
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
