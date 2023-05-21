//* parent component：
//* 1. ModalPortal.component.jsx

//* 專門提供新增及更新後台產品使用，對應 redux 為 adminProduct

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProductModal.styles.scss";

import { ReactComponent as NoImage } from "../../../assets/noImage.svg";

import {
  updateAdminProductAsync,
  createAdminProductAsync,
  setAdminProductModalOpen,
} from "../../../store/adminProduct/adminProduct.actions";

import { selectAdminProductTempData } from "../../../store/adminProduct/adminProduct.selector";

import { formContent } from "./formContent.data";

const defaultFormData = {
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
  num: 0,
  description: "",
  content: "",
  is_enabled: 0,
  imageUrl: "",
  imagesUrl: [],
};

const ProductModal = ({ createOrEdit }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const dispatch = useDispatch();
  const tempData = useSelector(selectAdminProductTempData);

  useEffect(() => {
    switch (createOrEdit) {
      case "create":
        setFormData(defaultFormData);
        break;
      case "edit":
        if (tempData.imagesUrl) {
          setFormData(tempData);
        } else {
          setFormData({ ...tempData, imagesUrl: [] });
        }
        break;
      default:
        throw new Error(`invalid input ${createOrEdit}`);
    }
  }, [createOrEdit, tempData]);
  //* 根據 type 開啟相對應 modal，並放入相對應資料

  const onCloseModal = () => {
    dispatch(setAdminProductModalOpen(false));
  };
  //* 關閉 modal 功能

  const onAddInput = () => {
    setFormData({
      ...formData,
      imagesUrl: [...formData.imagesUrl, ""],
    });
  };
  //* 增加新增 imagesUrl 的 input

  const onRemoveInput = (i) => {
    const filterImages = formData.imagesUrl.filter((_, index) => index !== i);
    setFormData({ ...formData, imagesUrl: [...filterImages] });
  };
  //* 刪除 imagesUrl

  const onChangeHandler = (e, i) => {
    const { value, name } = e.target;
    console.log(name, value);
    if (["price", "origin_price"].includes(name)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === "is_enabled") {
      setFormData({ ...formData, [name]: +e.target.checked });
    } else if (name.startsWith("imagesUrl")) {
      const newImages = [...formData.imagesUrl];
      newImages[i] = value;
      setFormData({ ...formData, imagesUrl: newImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  //* 針對每個 input 在新增內容時放入 formData

  const onSubmitHandler = () => {
    if (createOrEdit === "create") {
      dispatch(createAdminProductAsync(formData));
    } else {
      dispatch(updateAdminProductAsync(formData.id, formData));
    }
  };
  //* 按下儲存鍵後提交資料

  return (
    <>
      <div className="product-modal">
        <div className="product-modal__header">
          <h1 className="product-modal__header-title">
            {createOrEdit === "create"
              ? "建立新商品"
              : `產品名稱：${formData.title}`}
          </h1>
          <button
            type="button"
            className="product-modal__header-close"
            aria-label="Close"
            onClick={onCloseModal}
          >
            ｘ
          </button>
        </div>

        <div className="product-modal__body">
          <div className="product-modal__body-check">
            <label className="w-100 form-check-label" htmlFor="is_enabled">
              是否啟用
            </label>
            <input
              type="checkbox"
              id="is_enabled"
              name="is_enabled"
              placeholder="請輸入產品說明內容"
              className="form-check-input"
              onChange={onChangeHandler}
              checked={!!formData.is_enabled}
            />
          </div>
          <div className="product-modal__body-upper">
            <div className="product-modal__body-upper-left">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt={`主圖片：${formData.title}；無法顯示，請輸入正確連結`}
                  className="product-modal__body-upper-left-img"
                />
              ) : (
                <NoImage className="product-modal__body-upper-left-alt" />
              )}
              <label
                className="product-modal__body-upper-left-label"
                htmlFor="image"
              >
                主要圖片
              </label>
              <input
                type="text"
                name="imageUrl"
                id="image"
                placeholder="請輸入圖片連結"
                className="product-modal__body-upper-left-input"
                onChange={onChangeHandler}
                value={formData.imageUrl || ""}
              />
            </div>

            <div className="product-modal__body-upper-right">
              {formContent.input.map((content) => {
                return (
                  <div
                    className="product-modal__body-upper-right-group"
                    key={content.id}
                  >
                    <label
                      className="product-modal__body-upper-right-group-label"
                      htmlFor="title"
                    >
                      {content.title}
                    </label>
                    <input
                      type={content.type}
                      id={content.id}
                      name={content.id}
                      placeholder={content.placeholder}
                      className="product-modal__body-upper-right-group-input"
                      onChange={onChangeHandler}
                      value={formData[content.id] || ""}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="product-modal__body-middle">
            {formContent.textarea.map((content) => {
              return (
                <div
                  className="product-modal__body-middle-group"
                  key={content.id}
                >
                  <label
                    className="product-modal__body-middle-group-label"
                    htmlFor={content.description}
                  >
                    {content.title}
                  </label>
                  <textarea
                    type={content.type}
                    id={content.id}
                    name={content.id}
                    placeholder={content.placeholder}
                    className="product-modal__body-middle-group-textarea"
                    onChange={onChangeHandler}
                    value={formData[content.id] || ""}
                  />
                </div>
              );
            })}
          </div>

          <div className="product-modal__body-lower">
            <h6 className="product-modal__body-lower-title">
              次要圖片(可多張)
            </h6>
            <input
              id="trigger-check"
              type="checkbox"
              className="product-modal__body-lower-trigger"
            />
            <label
              className="product-modal__body-lower-toggle"
              htmlFor="trigger-check"
            >
              <div className="product-modal__body-lower-triangle" />
              <h6 className="product-modal__body-lower-toggle-title">
                開啟圖片列表
              </h6>
            </label>
            <div className="product-modal__body-lower-content">
              {formData.imagesUrl.map((url, i) => {
                return (
                  <div
                    className="product-modal__body-lower-content-item"
                    key={i}
                  >
                    {formData.imagesUrl[i] ? (
                      <img
                        src={url}
                        alt={`圖片：${formData.title}，第${
                          i + 1
                        }張；無法顯示，請輸入正確連結`}
                        className="product-modal__body-lower-content-item-img"
                      />
                    ) : (
                      <NoImage className="product-modal__body-lower-content-item-alt" />
                    )}
                    <label
                      className="product-modal__body-lower-content-item-label"
                      htmlFor={`images${i}`}
                    >
                      圖片 - {i + 1}
                      <button
                        type="button"
                        className="product-modal__body-lower-content-item-remove"
                        onClick={() => onRemoveInput(i)}
                      >
                        刪除
                      </button>
                    </label>

                    <input
                      type="text"
                      name={`imagesUrl${i}`}
                      id={`images${i}`}
                      placeholder="請輸入圖片連結"
                      className="product-modal__body-lower-content-item-input"
                      onChange={(e) => onChangeHandler(e, i)}
                      value={url || ""}
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="product-modal__body-lower-add"
              onClick={onAddInput}
            >
              新增
            </button>
          </div>
        </div>

        <div className="product-modal__footer">
          <button
            type="button"
            className="product-modal__footer-close"
            onClick={onCloseModal}
          >
            關閉
          </button>
          <button
            type="button"
            className="product-modal__footer-save"
            onClick={onSubmitHandler}
          >
            儲存
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
