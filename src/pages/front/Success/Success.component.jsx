import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "./Success.styles.scss";

import OrderCard from "../../../components/OrderCard/OrderCard.component";
import SummaryCard from "../../../components/SummaryCard/SummaryCard.component";

const Success = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const products = Object.values(orderData?.products || {});
  const totalPrice = products.reduce(
    (total, productPrice) => total + productPrice.final_total,
    0
  );

  const getCart = async (orderId) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
    );
    setOrderData(res.data.order);
  };

  useEffect(() => {
    getCart(orderId);
  }, [orderId]);

  return (
    <div className="success">
      <div className="success__order-content">
        <h1 className="success__order-content-title">訂購完成</h1>
        <p className="success__order-content-sentence">Wise choice！</p>
        <OrderCard products={products} />
      </div>

      <div className="success__order-detail">
        <h2 className="success__order-detail-title">詳細資訊</h2>
        <SummaryCard total={totalPrice} />
        <div className="success__actions">
          <Link to="/" className="success__actions-home">
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
