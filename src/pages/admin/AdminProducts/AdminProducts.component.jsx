//* parent component:
//* 1. App.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../../components/Pagination/Pagination.component";
import ModalPortal, {
  MODAL_TYPE,
} from "../../../components/UI/ModalSet/ModalPortal.component";
import { DELETE_MODAL_TYPE } from "../../../components/UI/ModalSet/DeleteModal/DeleteModal.component";

import {
  fetchAdminProductAsync,
  setAdminProductTempData,
  setAdminProductModalOpen,
} from "../../../store/adminProduct/adminProduct.actions";
import {
  selectAdminProducts,
  selectAdminProductPagination,
  selectAdminProductIsModalOpen,
} from "../../../store/adminProduct/adminProduct.selector";

const AdminProducts = () => {
  const [createOrEdit, setCreateOrEdit] = useState("create");
  const [openWhichModal, setOpenWhichModal] = useState("");
  const [dataType, setDataType] = useState("");
  const dispatch = useDispatch();
  const products = useSelector(selectAdminProducts);
  const pagination = useSelector(selectAdminProductPagination);
  const isModalOpen = useSelector(selectAdminProductIsModalOpen);

  useEffect(() => {
    dispatch(fetchAdminProductAsync());
  }, []);
  //* 設定 modal 背景為不可動，以及於 mounted 的時候 fetch 資料

  const onChangePage = (page) => {
    dispatch(fetchAdminProductAsync(page));
  };
  //* 透過 api 取得切換頁面後的產品資料

  const onOpenProductModal = (type, product) => {
    setCreateOrEdit(type);
    setOpenWhichModal(MODAL_TYPE.product);
    dispatch(setAdminProductTempData(product));
    dispatch(setAdminProductModalOpen(true));
  };
  //* 開啟編輯 modal

  const onOpenProductDeleteModal = (product) => {
    setOpenWhichModal(MODAL_TYPE.delete);
    setDataType(DELETE_MODAL_TYPE.adminProduct);
    dispatch(setAdminProductTempData(product));
    dispatch(setAdminProductModalOpen(true));
  };
  //* 打開刪除 modal

  return (
    <div className="p-3">
      {isModalOpen && (
        <ModalPortal
          createOrEdit={createOrEdit}
          openWhichModal={openWhichModal}
          dataType={dataType}
        />
      )}
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onOpenProductModal("create")}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled === 1 ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onOpenProductModal("edit", product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => onOpenProductDeleteModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination onChangePage={onChangePage} pagination={pagination} />
    </div>
  );
};

export default AdminProducts;
