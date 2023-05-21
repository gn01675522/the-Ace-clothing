//* parent component:
//* 1. App.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AdminProducts.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import ModalPortal, {
  MODAL_TYPE,
} from "../../../components/ModalSet/ModalPortal.component";

import AdminTable, {
  ADMIN_TABLE_TYPE,
} from "../../../components/AdminTable/AdminTable.component";
import { DELETE_MODAL_TYPE } from "../../../components/ModalSet/DeleteModal/DeleteModal.component";

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
  //* modal 視窗選項：建立新商品，或是編輯商品。 edit or create
  const [openWhichModal, setOpenWhichModal] = useState("");
  //* modal 類型選項：products ? coupons ? orders ?
  const [dataType, setDataType] = useState("");
  //* 刪除 modal 選項：products ? coupons ? orders ?

  const dispatch = useDispatch();
  const products = useSelector(selectAdminProducts);
  const pagination = useSelector(selectAdminProductPagination);
  const isModalOpen = useSelector(selectAdminProductIsModalOpen);

  useEffect(() => {
    dispatch(fetchAdminProductAsync());
  }, []);
  //* 設定 mounted 的時候 fetch 資料

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
  //* 開啟編輯商品或是新增商品 modal

  const onOpenProductDeleteModal = (product) => {
    setOpenWhichModal(MODAL_TYPE.delete);
    setDataType(DELETE_MODAL_TYPE.adminProduct);
    dispatch(setAdminProductTempData(product));
    dispatch(setAdminProductModalOpen(true));
  };
  //* 打開刪除 modal

  return (
    <div className="admin-products">
      {isModalOpen && (
        <ModalPortal
          createOrEdit={createOrEdit}
          openWhichModal={openWhichModal}
          dataType={dataType}
        />
      )}
      <h3 className="admin-products__title">產品列表</h3>
      <div className="admin-products__actions">
        <button
          type="button"
          className="admin-products__actions-add"
          onClick={() => onOpenProductModal("create")}
        >
          建立新商品
        </button>
      </div>
      <AdminTable
        type={ADMIN_TABLE_TYPE.products}
        items={products}
        onEdit={onOpenProductModal}
        onDelete={onOpenProductDeleteModal}
      />

      <Pagination onChangePage={onChangePage} pagination={pagination} />
    </div>
  );
};

export default AdminProducts;
