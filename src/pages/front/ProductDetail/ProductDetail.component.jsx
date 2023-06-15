import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductDetail.styles.scss";

import Message from "../../../components/Message/Message.component";

import { fetchUserSingleProductAsync } from "../../../store/userProduct/userProduct.actions";
import { selectUserSingleProduct } from "../../../store/userProduct/userProduct.selector";
import { selectHasMessage } from "../../../store/message/message.selector";
import { setAddItemToCartAsync } from "../../../store/cart/cart.actions";
import { selectCartIsLoading } from "../../../store/cart/cart.selector";

const ProductDetail = () => {
  const [imgWidth, setImgWidth] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const hasMessage = useSelector(selectHasMessage);
  const isLoading = useSelector(selectCartIsLoading);
  const product = useSelector(selectUserSingleProduct);

  const { imageUrl, imagesUrl, title, price, content, description } = product;

  const imgPreviewRef = useRef();
  const imgContainerRef = useRef();

  useEffect(() => {
    dispatch(fetchUserSingleProductAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    const detectResize = () => {
      const imgInitialWidth = imgContainerRef.current.clientWidth;
      if (imgInitialWidth) {
        setImgWidth(imgInitialWidth);
      }
    };
    //* 偵測螢幕寬度，並儲存起來
    detectResize();

    window.addEventListener("resize", detectResize);
    return () => {
      window.removeEventListener("resize", detectResize);
      //* cleanup 函式
    };
  }, []);
  //* 防止組件剛掛載 product 並無法馬上取得資料導致 DOM 抓不到的問題；
  //* 以及解決 imgWidth 只會抓取第一次組件 mount 時的寬度，而不會隨著螢幕尺寸改變的問題

  const pictureSet = [imageUrl, ...(Array.isArray(imagesUrl) ? imagesUrl : [])];
  //* 直接將主圖片以及次要圖片組合成一個陣列，方便後續渲染 jsx；如果 imagesUrl 沒有圖片的話，就改成空陣列

  const onChangeImg = (type) => {
    const previewContainer = imgPreviewRef.current;
    previewContainer.scrollLeft += type === "prev" ? -imgWidth : imgWidth;
  };
  //* 以 ul 為目標，如果按鈕回傳的為 prev，那麼就減少 imgWidth，讓圖片由右往左，反之。

  const addToCart = () => {
    const data = {
      data: {
        product_id: id,
        qty: cartQuantity,
      },
    };
    dispatch(setAddItemToCartAsync(data));
  };

  return (
    <div className="product-detail">
      {hasMessage && <Message />}
      <div className="product-detail__sale">
        <div className="product-detail__sale-wrapper">
          <ul className="product-detail__sale-preview" ref={imgPreviewRef}>
            {pictureSet?.map((img, i) => (
              <li
                className="product-detail__sale-preview-item"
                ref={imgContainerRef}
                key={i}
              >
                <img src={img} alt="" />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="product-detail__sale-wrapper-prev"
            onClick={() => onChangeImg("prev")}
          />
          <button
            type="button"
            className="product-detail__sale-wrapper-next"
            onClick={() => onChangeImg("next")}
          />
        </div>

        <div className="product-detail__sale-info">
          <div className="product-detail__sale-info-content">
            <h3 className="product-detail__sale-info-content-subtitle">
              the Ace Clothing
            </h3>
            <h1 className="product-detail__sale-info-content-title">{title}</h1>
            <span className="product-detail__sale-info-content-price">
              NT${price}
            </span>
          </div>
          <div className="product-detail__description">
            <div className="product-detail__description-content">{content}</div>
            <h2 className="product-detail__description-title">詳細資料</h2>
            <ul className="product-detail__description-info">
              {description?.split("-").map((item) => (
                <li
                  key={item}
                  className="product-detail__description-info-item"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="product-detail__sale-function">
            <div className="product-detail__sale-function-quantity">
              <button
                className="product-detail__sale-function-minor"
                onClick={() => {
                  setCartQuantity((pre) => (pre === 1 ? pre : pre - 1));
                }}
              >
                -
              </button>
              <input
                className="product-detail__sale-function-entry"
                type="number"
                value={cartQuantity}
                readOnly
              />
              <button
                className="product-detail__sale-function-add"
                onClick={() => {
                  setCartQuantity((pre) => (pre >= 5 ? pre : pre + 1));
                }}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="product-detail__sale-function-btn"
              onClick={() => addToCart()}
              disabled={isLoading}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
