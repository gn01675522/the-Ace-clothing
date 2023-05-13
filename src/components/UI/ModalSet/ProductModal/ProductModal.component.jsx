//* parent component：
//* 1. ModalPortal.component.jsx

//* 專門提供新增及更新後台產品使用，對應 redux 為 adminProduct

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateAdminProductAsync,
  createAdminProductAsync,
  setAdminProductModalOpen,
} from "../../../../store/adminProduct/adminProduct.actions";

import { selectAdminProductTempData } from "../../../../store/adminProduct/adminProduct.selector";

const defaultFormData = {
  title: "",
  category: "",
  origin_price: 0,
  price: 0,
  unit: "",
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

  const onChangeHandler = (e, i) => {
    const { value, name } = e.target;
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
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {createOrEdit === "create" ? "建立新商品" : `${formData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCloseModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="image">
                    主要圖片
                    <input
                      type="text"
                      name="imageUrl"
                      id="image"
                      placeholder="請輸入圖片連結"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={formData.imageUrl}
                    />
                  </label>
                </div>

                <div className="form-group mb-2">
                  <h6 className="w-100">
                    次要圖片，可多張
                    {formData.imagesUrl.map((url, i) => {
                      return (
                        <label className="w-100" htmlFor={`images${i}`} key={i}>
                          圖片 - {i}
                          <input
                            type="text"
                            name={`imagesUrl${i}`}
                            id={`images${i}`}
                            placeholder="請輸入圖片連結"
                            className="form-control"
                            onChange={(e) => onChangeHandler(e, i)}
                            value={url}
                          />
                        </label>
                      );
                    })}
                  </h6>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onAddInput}
                >
                  新增圖片
                </button>
                <img src="" alt="" className="img-fluid" />
              </div>
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="請輸入標題"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={formData.title}
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="請輸入分類"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={formData.category}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        placeholder="請輸入單位"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={formData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input
                        type="number"
                        id="origin_price"
                        name="origin_price"
                        placeholder="請輸入原價"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={formData.origin_price}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="請輸入售價"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={formData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    產品描述
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="請輸入產品描述"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={formData.description}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    說明內容
                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      placeholder="請輸入產品說明內容"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={formData.content}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label
                      className="w-100 form-check-label"
                      htmlFor="is_enabled"
                    >
                      是否啟用
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        placeholder="請輸入產品說明內容"
                        className="form-check-input"
                        onChange={onChangeHandler}
                        checked={!!formData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModal}
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

export default ProductModal;
