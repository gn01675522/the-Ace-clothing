import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";

import OrderModal from "../../../components/OrderModal/OrderModal";
import Pagination from "../../../components/Pagination/Pagination";

import { fetchAdminOrdersAsync } from "../../../store/adminOrders/adminOrders.actions";
import {
  selectAdminOrders,
  selectAdminOrdersPagination,
} from "../../../store/adminOrders/adminOrders.selector";

const AdminOrders = () => {
  const [type, setType] = useState("create"); // edit
  // type: 決定 modal 展開的用途
  const [tempOrder, setTempOrder] = useState({});
  const dispatch = useDispatch();
  const orderModal = useRef(null);

  const orders = useSelector(selectAdminOrders);
  const pagination = useSelector(selectAdminOrdersPagination);

  useEffect(() => {
    orderModal.current = new Modal("#orderModal", {
      backdrop: "static",
    });
    dispatch(fetchAdminOrdersAsync());
  }, []);

  const changePage = (page) => {
    dispatch(fetchAdminOrdersAsync(page));
  };

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  };
  const closeOrderModal = () => {
    setTempOrder({});
    orderModal.current.hide();
  };

  return (
    <div className="p-3">
      <OrderModal
        closeProductModal={closeOrderModal}
        tempOrder={tempOrder}
      />
      <h3>訂單列表</h3>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單 id</th>
            <th scope="col">購買用戶</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">付款日期</th>
            <th scope="col">留言訊息</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  {order.user?.email}
                </td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className="text-success fw-bold">付款完成</span>
                  ) : (
                    "未付款"
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : "未付款"}
                </td>
                <td>{order.message}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    查看
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={changePage} />
    </div>
  );
};

export default AdminOrders;
