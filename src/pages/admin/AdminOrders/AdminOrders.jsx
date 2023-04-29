import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../../components/Pagination/Pagination";
import ModalPortal, {
  MODAL_TYPE,
} from "../../../components/ModalSet/ModalPortal.component";

import {
  fetchAdminOrdersAsync,
  setAdminOrdersIsModalOpen,
  setAdminOrdersTempData,
} from "../../../store/adminOrders/adminOrders.actions";
import {
  selectAdminOrders,
  selectAdminOrdersPagination,
  selectAdminOrdersIsModalOpen,
} from "../../../store/adminOrders/adminOrders.selector";

const AdminOrders = () => {
  const [openWhichModal, setOpenWhichModal] = useState("");
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrders);
  const pagination = useSelector(selectAdminOrdersPagination);
  const isModalOpen = useSelector(selectAdminOrdersIsModalOpen);

  useEffect(() => {
    dispatch(fetchAdminOrdersAsync());
  }, []);

  const onChangePageHandler = (page) => {
    dispatch(fetchAdminOrdersAsync(page));
  };

  const onOpenModalHandler = (order) => {
    setOpenWhichModal(MODAL_TYPE.order);
    dispatch(setAdminOrdersTempData(order));
    dispatch(setAdminOrdersIsModalOpen(true));
  };

  return (
    <div className="p-3">
      {isModalOpen && <ModalPortal openWhichModal={openWhichModal} />}
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
                      onOpenModalHandler(order);
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
      <Pagination pagination={pagination} onChangePage={onChangePageHandler} />
    </div>
  );
};

export default AdminOrders;
