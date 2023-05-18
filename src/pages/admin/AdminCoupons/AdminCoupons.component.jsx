//* parent component：
//* 1. App.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AdminCoupons.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import ModalPortal, {
  MODAL_TYPE,
} from "../../../components/UI/ModalSet/ModalPortal.component";
import AdminTable, {
  ADMIN_TABLE_TYPE,
} from "../../../components/AdminTable/AdminTable.component";

import { DELETE_MODAL_TYPE } from "../../../components/UI/ModalSet/DeleteModal/DeleteModal.component";

import {
  fetchAdminCouponsAsync,
  setAdminCouponsOpen,
  setAdminCouponsTempData,
} from "../../../store/adminCoupons/adminCoupons.actions";

import {
  selectAdminCouponsIsModalOpen,
  selectAdminCoupons,
  selectAdminCouponsPagination,
} from "../../../store/adminCoupons/adminCoupons.selector";

const AdminCoupons = () => {
  const [createOrEdit, setCreateOrEdit] = useState("create");
  // type: 決定 modal 展開的用途
  const [openWhichModal, setOpenWhichModal] = useState("");
  const [dataType, setDataType] = useState("");
  const dispatch = useDispatch();
  const coupons = useSelector(selectAdminCoupons);
  const pagination = useSelector(selectAdminCouponsPagination);
  const isModalOpen = useSelector(selectAdminCouponsIsModalOpen);

  useEffect(() => {
    dispatch(fetchAdminCouponsAsync());
  }, []);

  const onChangePageHandler = (page) => {
    dispatch(fetchAdminCouponsAsync(page));
  };

  const openCouponModal = (type, product) => {
    setCreateOrEdit(type);
    setOpenWhichModal(MODAL_TYPE.coupon);
    dispatch(setAdminCouponsTempData(product));
    dispatch(setAdminCouponsOpen(true));
  };

  const onOpenDeleteModal = (product) => {
    setOpenWhichModal(MODAL_TYPE.delete);
    setDataType(DELETE_MODAL_TYPE.adminCoupon);
    dispatch(setAdminCouponsTempData(product));
    dispatch(setAdminCouponsOpen(true));
  };

  return (
    <div className="p-3">
      {isModalOpen && (
        <ModalPortal
          openWhichModal={openWhichModal}
          dataType={dataType}
          createOrEdit={createOrEdit}
        />
      )}
      <h3>優惠券列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal("create", {})}
        >
          建立新優惠券
        </button>
      </div>
      <AdminTable
        type={ADMIN_TABLE_TYPE.coupons}
        items={coupons}
        onEdit={openCouponModal}
        onDelete={onOpenDeleteModal}
      />
      <Pagination pagination={pagination} onChangePage={onChangePageHandler} />
    </div>
  );
};

export default AdminCoupons;
