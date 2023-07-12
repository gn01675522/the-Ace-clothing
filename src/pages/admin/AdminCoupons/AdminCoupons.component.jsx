//* parent component：
//* 1. App.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AdminCoupons.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import ModalPortal, {
  MODAL_TYPE,
} from "../../../components/ModalSet/ModalPortal.component";
import AdminTable, {
  ADMIN_TABLE_TYPE,
} from "../../../components/AdminTable/AdminTable.component";

import { DELETE_MODAL_TYPE } from "../../../components/ModalSet/DeleteModal/DeleteModal.component";

import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../components/UI/Button/Button.component";

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
  const { total_pages, current_page } = pagination;

  useEffect(() => {
    dispatch(fetchAdminCouponsAsync());
  }, [dispatch]);

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
    <div className="admin-coupons">
      {isModalOpen && (
        <ModalPortal
          openWhichModal={openWhichModal}
          dataType={dataType}
          createOrEdit={createOrEdit}
        />
      )}
      <h3 className="admin-coupons__title">優惠券列表</h3>
      <div className="admin-coupons__actions">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
          onClick={() => openCouponModal("create", {})}
        >
          建立新優惠券
        </Button>
      </div>
      <AdminTable
        type={ADMIN_TABLE_TYPE.coupons}
        items={coupons}
        onEdit={openCouponModal}
        onDelete={onOpenDeleteModal}
      />
      <Pagination
        currentPage={current_page}
        onChangePage={onChangePageHandler}
        pageCount={total_pages}
      />
    </div>
  );
};

export default AdminCoupons;
