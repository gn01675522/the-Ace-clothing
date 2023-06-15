//* parent component：
//* 1. ModalPortal.component.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./CouponModal.styles.scss";

import { selectAdminCouponsTempData } from "../../../store/adminCoupons/adminCoupons.selector";
import { setAdminCouponsOpen } from "../../../store/adminCoupons/adminCoupons.actions";

import {
  createAdminCouponAsync,
  updateAdminCouponAsync,
} from "../../../store/adminCoupons/adminCoupons.actions";

import { formContent } from "./formContent.data";

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
      <div className="coupon-modal">
        <div className="coupon-modal__header">
          <h1 className="coupon-modal__header-title">
            {createOrEdit === "create"
              ? "建立新優惠券"
              : `優惠券名稱： ${formData.title}`}
          </h1>
          <button
            type="button"
            className="coupon-modal__header-button"
            aria-label="Close"
            onClick={onCloseModalHandler}
          >
            X
          </button>
        </div>

        <div className="coupon-modal__body">
          <div className="coupon-modal__body-check">
            <label
              className="coupon-modal__body-check-label"
              htmlFor="is_enabled"
            >
              是否啟用
            </label>
            <input
              className="coupon-modal__body-check-input"
              type="checkbox"
              id="is_enabled"
              name="is_enabled"
              checked={!!formData.is_enabled}
              onChange={handleChange}
            />
          </div>
          <div className="coupon-modal__body-content">
            {formContent.map((content) => {
              return (
                <div className="coupon-modal__body-content-group">
                  <label
                    className="coupon-modal__body-content-group-label"
                    htmlFor={content.id}
                  >
                    {content.title}
                  </label>
                  <input
                    type={content.type}
                    id={content.id}
                    placeholder={
                      content.id === "percent"
                        ? undefined
                        : `請輸入${content.title}`
                    }
                    name={content.id}
                    className="coupon-modal__body-content-group-input"
                    value={
                      content.id === "due_date"
                        ? `${date.getFullYear().toString()}-${(
                            date.getMonth() + 1
                          )
                            .toString()
                            .padStart(2, 0)}-${date
                            .getDate()
                            .toString()
                            .padStart(2, 0)}`
                        : formData[content.id]
                    }
                    onChange={
                      content.id === "due_date"
                        ? (e) => {
                            setDate(new Date(e.target.value));
                          }
                        : handleChange
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="coupon-modal__footer">
          <button
            type="button"
            className="coupon-modal__footer-close"
            onClick={onCloseModalHandler}
          >
            關閉
          </button>
          <button
            type="button"
            className="coupon-modal__footer-save"
            onClick={onSubmitHandler}
          >
            儲存
          </button>
        </div>
      </div>
    </>
  );
};

export default CouponModal;
