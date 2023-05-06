import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.styles.scss";

import { selectHasMessage } from "../../../store/message/message.selector";
import Message from "../../../components/Message/Message";

import { setAddItemToCartAsync } from "../../../store/cart/cart.actions";
import { selectCartIsLoading } from "../../../store/cart/cart.selector";

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const hasMessage = useSelector(selectHasMessage);
  const isLoading = useSelector(selectCartIsLoading);

  const { imageUrl, imagesUrl, title, price, num, content, description } =
    product;

  const getProduct = async (id) => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    setProduct(productRes.data.product);
  };

  const addToCart = async () => {
    const data = {
      data: {
        product_id: id,
        qty: cartQuantity,
      },
    };
    dispatch(setAddItemToCartAsync(data));
    // dispatch(setHandleMessage("success", res));
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <div className="product-detail">
      {hasMessage && <Message />}
      <div className="product-detail__sale">
        <img src={imageUrl} alt="" className="product-detail__sale-img" />
        <div className="product-detail__sale-info">
          <div className="product-detail__sale-info-content">
            <h1 className="product-detail__sale-info-content-title">{title}</h1>
            <span className="product-detail__sale-info-content-price">
              NT${price}
            </span>
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
