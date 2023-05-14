//* parent component：
//* 1. ModalPortal.component.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAdminCouponsTempData } from "../../../../store/adminCoupons/adminCoupons.selector";
import { setAdminCouponsOpen } from "../../../../store/adminCoupons/adminCoupons.actions";

import {
  createAdminCouponAsync,
  updateAdminCouponAsync,
} from "../../../../store/adminCoupons/adminCoupons.actions";

const defaultFormData = {
  title: "",
  is_enabled: 1,
  percent: 80,
  due_date: 1555459200,
  code: "testCode",
};

const CouponModal = ({ createOrEdit }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const tempCoupon = useSelector(selectAdminCouponsTempData);

  useEffect(() => {
    switch (createOrEdit) {
      case "create":
        setFormData(defaultFormData);
        setDate(new Date());
        break;
      case "edit":
        setFormData(tempCoupon);
        setDate(new Date(tempCoupon.due_date));
        break;
      default:
        throw new Error(`invalid input ${createOrEdit}`);
    }
  }, [createOrEdit, tempCoupon]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "percent") {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === "is_enabled") {
      setFormData({ ...formData, [name]: +e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onCloseModalHandler = () => {
    dispatch(setAdminCouponsOpen(false));
  };

  const onSubmitHandler = () => {
    if (createOrEdit === "create") {
      dispatch(createAdminCouponAsync(formData, date));
    } else {
      dispatch(updateAdminCouponAsync(formData, date));
    }
  };

  return (
    <>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {createOrEdit === "create"
                ? "建立新優惠券"
                : `編輯 ${formData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCloseModalHandler}
            />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  name="title"
                  className="form-control mt-1"
                  value={formData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="text"
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                    value={formData.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                    value={`${date.getFullYear().toString()}-${(
                      date.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, 0)}-${date
                      .getDate()
                      .toString()
                      .padStart(2, 0)}`}
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                    }}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                checked={!!formData.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModalHandler}
            >
              關閉
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmitHandler}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponModal;