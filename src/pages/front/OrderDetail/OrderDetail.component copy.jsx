import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderDetail.styles.scss";
import Categories from "../../../components/Categories/Categories.component";

import { fetchUserOrderDataAsync } from "../../../store/userOrder/userOrder.actions";
import { selectUserOrderData } from "../../../store/userOrder/userOrder.selector";

const OrderDetail = () => {
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();
  const userEmail = useRef();
  const orderDetail = useSelector(selectUserOrderData);

  useEffect(() => {
    dispatch(fetchUserOrderDataAsync());
  }, [dispatch]);

  const onSearchOrder = (e) => {
    e.preventDefault();
    setOrderList(
      orderDetail.filter((data) => data.user.email === userEmail.current.value)
    );
  };

  return (
    <div className="order-detail">
      <h1 className="order-detail__title">訂單查詢</h1>
      <form className="order-detail__search" onSubmit={onSearchOrder}>
        <label>請輸入 E-MAIL</label>
        <input type="search" ref={userEmail} placeholder="請輸入 email" />
        <button type="submit">查詢</button>
      </form>
      <h2>訂單列表</h2>
      {orderList.length > 0 ? (
        <div className="order-detail__order-list">
          {orderList.map((order) => {
            const { id, is_paid, total, user } = order;
            return (
              <div className="order-detail__order-content" key={id}>
                <div className="order-detail__order-content-header">
                  <div className="order-detail__order-content-header-title">
                    訂單概要
                  </div>
                  <div className="order-detail__order-content-item">
                    <span className="order-detail__order-content-item-key">
                      訂單編號：
                    </span>
                    <span className="order-detail__order-content-item-value">
                      {id}
                    </span>
                  </div>

                  <div className="order-detail__order-content-item">
                    <span className="order-detail__order-content-item-key">
                      付款狀態：
                    </span>
                    <span className="order-detail__order-content-item-value">
                      {is_paid === true ? "已付款" : "未付款"}
                      <span
                        className={`order-detail__circle ${
                          is_paid === true
                            ? "order-detail__circle--paid"
                            : "order-detail__circle--unpaid"
                        }`}
                      />
                    </span>
                  </div>

                  <div className="order-detail__order-content-item">
                    <span className="order-detail__order-content-item-key">
                      總金額：
                    </span>
                    <span className="order-detail__order-content-item-value">
                      {total}
                    </span>
                  </div>
                </div>

                <div className="order-detail__order-content-body">
                  <div className="order-detail__order-content-body-title">
                    客戶資訊
                  </div>
                  <div className="order-detail__order-content-item">
                    <span className="order-detail__order-content-item-key">
                      姓名：
                    </span>
                    <span className="order-detail__order-content-item-value">
                      {user.name}
                    </span>
                  </div>
                  <div className="order-detail__order-content-item">
                    <span className="order-detail__order-content-item-key">
                      運送地址：
                    </span>
                    <span className="order-detail__order-content-item-value">
                      {user.address}
                    </span>
                  </div>
                  <div className="order-detail__order-content-item">
                    <span className="order-detail__order-content-item-key">
                      電話：
                    </span>
                    <span className="order-detail__order-content-item-value">
                      {user.tel}
                    </span>
                  </div>
                  <div className="order-detail__order-content-item">
                    <span className="order-detail__order-content-item-key">
                      電子信箱：
                    </span>
                    <span className="order-detail__order-content-item-value">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="order-detail__order-content-footer">
                  <div className="order-detail__order-content-footer-function">
                    訂單詳細
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div>無任何訂單，快去購物吧！</div>
          <Categories />
        </>
      )}
    </div>
  );
};

export default OrderDetail;
// todo 完成表格

{
  /* <div className="order-detail__card">
  <div className="order-detail__card-header">
    <div>總金額：{order.total}</div>
    <div>姓名：{order.user.name}</div>
    <div>運送地址：{order.user.address}</div>
  </div>
  <div className="order-detail__card-body">
    {Object.entries(products).map(([key, value]) => {
      console.log("inside jsx child", value);
      return <div className="order-detail__card-item" key={key}></div>;
    })}
  </div>
  <div className="order-detail__card-footer">dsfasf</div>
</div>; */
}
