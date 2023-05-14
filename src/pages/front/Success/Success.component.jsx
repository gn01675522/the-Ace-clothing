import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import "./Success.styles.scss";

import OrderCard from "../../../components/OrderCard/OrderCard.component";
import SummaryCard from "../../../components/SummaryCard/SummaryCard.component";

import {
  selectUserOrderProducts,
  selectUserOrderTotalPrice,
} from "../../../store/userOrder/userOrder.selector";

import { fetchCartItemsAsync } from "../../../store/cart/cart.actions";
import { fetchUserOrderDataAsync } from "../../../store/userOrder/userOrder.actions";
import { setClearUserOrderState } from "../../../store/userOrder/userOrder.actions";

const Success = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectUserOrderProducts);
  const totalPrice = useSelector(selectUserOrderTotalPrice);

  const clearOrderState = () => {
    dispatch(setClearUserOrderState());
  };

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
    dispatch(fetchUserOrderDataAsync(orderId));
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
          <Link
            to="/"
            className="success__actions-home"
            onClick={clearOrderState}
          >
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
