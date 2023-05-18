import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AdminOrders.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import ModalPortal, {
  MODAL_TYPE,
} from "../../../components/UI/ModalSet/ModalPortal.component";
import AdminTable, {
  ADMIN_TABLE_TYPE,
} from "../../../components/AdminTable/AdminTable.component";

import { DELETE_MODAL_TYPE } from "../../../components/UI/ModalSet/DeleteModal/DeleteModal.component";

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
  const [dataType, setDataType] = useState("");

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
  // todo 需要重新思考 modal 開啟方式，感覺目前的方法使用起來不太方便
  const onOpenOrdersModal = (_, order) => {
    console.log("modal trigger", order);
    setOpenWhichModal(MODAL_TYPE.order);
    dispatch(setAdminOrdersTempData(order));
    dispatch(setAdminOrdersIsModalOpen(true));
  };

  const onOpenOrdersDeleteModal = (order) => {
    setOpenWhichModal(MODAL_TYPE.delete);
    setDataType(DELETE_MODAL_TYPE.adminOrder);
    dispatch(setAdminOrdersTempData(order));
    dispatch(setAdminOrdersIsModalOpen(true));
  };
  //* 打開刪除 modal

  return (
    <div className="admin-orders">
      {isModalOpen && (
        <ModalPortal openWhichModal={openWhichModal} dataType={dataType} />
      )}
      <h3 className="admin-orders__title">訂單列表</h3>
      <AdminTable
        type={ADMIN_TABLE_TYPE.orders}
        items={orders}
        onEdit={onOpenOrdersModal}
        onDelete={onOpenOrdersDeleteModal}
      />

      <Pagination pagination={pagination} onChangePage={onChangePageHandler} />
    </div>
  );
};

export default AdminOrders;
