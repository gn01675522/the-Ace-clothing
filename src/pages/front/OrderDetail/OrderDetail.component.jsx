import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderDetail.styles.scss";
import Categories from "../../../components/Categories/Categories.component";

import { fetchUserOrderDataAsync } from "../../../store/userOrder/userOrder.actions";
import { selectUserOrderData } from "../../../store/userOrder/userOrder.selector";
import { selectUserOrderByEmail } from "../../../store/userOrder/userOrder.selector";

const tableContent = [
  { title: "訂單編號", content: "id" },
  { title: "訂單日期", content: "create_at" },
  { title: "運送地址", content: "address" },
  { title: "總金額", content: "total" },
];

const OrderDetail = () => {
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();
  const orderDetail = useSelector(selectUserOrderData);

  useEffect(() => {
    dispatch(fetchUserOrderDataAsync());
  }, [dispatch]);

  useEffect(() => {
    setOrderList(
      orderDetail?.filter(
        (order) => order.user.email === "gn0112233@yahoo.com.tw"
      )
    );
  }, [orderDetail]);

  console.log(orderList);

  return (
    <div className="order-detail">
      <div className="order-detail__list">
        {orderList?.map((order) => (
          <div className="order-detail__card" key={order.id}>
            <div
              className={`order-detail__card-paid-state ${
                order.is_paid === true
                  ? "order-detail__card-paid-state--paid"
                  : "order-detail__card-paid-state--unpaid"
              }`}
            >
              {order.is_paid === true ? "已付款" : "未付款"}
            </div>

            <div className="order-detail__card-content">
              {tableContent.map((item, i) => (
                <div
                  className={`order-detail__card-content-item ${
                    i === tableContent.length - 1
                      ? " order-detail__card-content-item-last"
                      : ""
                  }`}
                  key={item.content}
                >
                  <div className="order-detail__card-content-item-title">
                    {item.title}
                  </div>
                  <div className="order-detail__card-content-item-value">
                    {item.content === "address"
                      ? order.user[item.content]
                      : order[item.content]}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-detail__card-function">
              <button
                type="button"
                className="order-detail__card-function-buy-again"
              >
                BUY AGAIN
              </button>
              <button
                type="button"
                className="order-detail__card-function-view"
              >
                DETAIL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
// todo 完成表格
