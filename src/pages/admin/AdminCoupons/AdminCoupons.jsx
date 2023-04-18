import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal } from "bootstrap";

import CouponModal from "../../../components/CouponModal/CouponModal";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Pagination from "../../../components/Pagination/Pagination";
import { fetchAdminCouponsAsync } from "../../../store/adminCoupons/adminCoupons.actions";
import {
  selectAdminCoupons,
  selectAdminCouponsPagination,
} from "../../../store/adminCoupons/adminCoupons.selector";

const AdminCoupons = () => {
  const [type, setType] = useState("create"); // edit
  // type: 決定 modal 展開的用途
  const [tempCoupon, setTempCoupon] = useState({});
  const dispatch = useDispatch();
  const coupons = useSelector(selectAdminCoupons);
  const pagination = useSelector(selectAdminCouponsPagination);

  const couponModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    couponModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });
    dispatch(fetchAdminCouponsAsync());
  }, []);

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  };

  const changePage = (page) => {
    dispatch(fetchAdminCouponsAsync(page));
  };

  const closeModal = () => {
    couponModal.current.hide();
  };

  const openDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        dispatch(fetchAdminCouponsAsync());
        deleteModal.current.hide();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <CouponModal
        closeModal={closeModal}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />
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
                    onClick={() => openDeleteModal(product)}
                  >
                    刪除
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

export default AdminCoupons;
