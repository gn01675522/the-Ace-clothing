import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { setHandleMessage } from "../../../store/message/message.actions";
import { selectHasMessage } from "../../../store/message/message.selector";
import Message from "../../../components/Message/Message";

import {
  fetchCartItemsAsync,
  setAddItemToCartAsync,
} from "../../../store/cart/cart.actions";
import { selectCartIsLoading } from "../../../store/cart/cart.selector";

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const hasMessage = useSelector(selectHasMessage);
  const isLoading = useSelector(selectCartIsLoading);

  const { imageUrl, imagesUrl, title, price, content, description } = product;

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
    <div className="container">
      {hasMessage && <Message />}
      <div
        style={{
          minHeight: "400px",
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0">{title}</h2>
          <p className="fw-bold">NT${price}</p>
          <p>{content}</p>
          <div className="my-4">
            {new Array(imagesUrl).map((url, index) => {
              return (
                <img src={url} alt="" className="img-fluid mt-4" key={index} />
              );
            })}
          </div>
          <div
            className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
            id="accordionExample"
          >
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingOne"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">測試區塊1</h4>
                  <i className="fas fa-minus"></i>
                </div>
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">{description}</div>
              </div>
            </div>
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingTwo"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">測試區塊2</h4>
                  <i className="fas fa-plus"></i>
                </div>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">區塊 2 內容</div>
              </div>
            </div>
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingThree"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">測試區塊3</h4>
                  <i className="fas fa-plus"></i>
                </div>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">區塊 3 內容</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3 border mt-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                onClick={() => {
                  setCartQuantity((pre) => (pre === 1 ? pre : pre - 1));
                }}
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
            <input
              type="number"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={cartQuantity}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                onClick={() => {
                  setCartQuantity((pre) => pre + 1);
                }}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark w-100 rounded-0 py-3"
            onClick={() => addToCart()}
            disabled={isLoading}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
