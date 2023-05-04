//* parent component：
//* 1. App.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../../components/Pagination/Pagination.component";
import ModalPortal, {
  MODAL_TYPE,
} from "../../../components/ModalSet/ModalPortal.component";
import { DELETE_MODAL_TYPE } from "../../../components/ModalSet/DeleteModal/DeleteModal.component";

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
  const [createOrEdit, setCreateOrEdit] = useState("create"); // edit
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

  const onOpenDeleteModalHandler = (product) => {
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.percent}</td>
                <td>{new Date(product.due_date).toDateString()}</td>
                <td>{product.code}</td>
                <td>{product.is_enabled === 1 ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal("edit", product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => onOpenDeleteModalHandler(product)}
                  >
                    刪除
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

export default AdminCoupons;
