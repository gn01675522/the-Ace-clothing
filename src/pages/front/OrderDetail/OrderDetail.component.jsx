import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrderDetail.styles.scss";
import { fetchUserOrderDataAsync } from "../../../store/userOrder/userOrder.actions";
import { selectUserOrderData } from "../../../store/userOrder/userOrder.selector";

const OrderDetail = () => {
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();
  const userEmail = useRef();
  const orderDetail = useSelector(selectUserOrderData);

  useEffect(() => {
    dispatch(fetchUserOrderDataAsync());
  }, []);

  const onSearchOrder = () => {
    setOrderList(
      orderDetail.filter((data) => data.user.email === userEmail.current.value)
    );
  };

  console.log(orderList);

  return (
    <div className="order-detail">
      <h1 className="order-detail__title">訂單查詢</h1>
      <div className="order-detail__search">
        <label>請輸入 E-MAIL</label>
        <input type="search" ref={userEmail} placeholder="請輸入 email" />
        <button onClick={onSearchOrder}>查詢</button>
      </div>
      <h2>訂單列表</h2>
      <div className="order-detail__order-list">
        {orderList.map((order) => (
          <label
            className="order-detail__order-toggle"
            htmlFor="order-trigger"
            key={order.id}
          >
            <input
              className="order-detail__order-toggle-trigger"
              type="checkbox"
              id="order-trigger"
            />
            <div className="order-detail__order-toggle-item">
              訂單編號：<span>{order.id}</span>
            </div>
            <div className="order-detail__order-toggle-item">
              日期：<span>{order.create_at}</span>
            </div>
            <div className="order-detail__order-toggle-item">
              總金額：<span>{order.total}</span>
            </div>
            <div className="order-detail__order-card">
              <div className="order-detail__order-card-header"></div>
              <div className="order-detail__order-card-body"></div>
              <div className="order-detail__order-card-footer"></div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
