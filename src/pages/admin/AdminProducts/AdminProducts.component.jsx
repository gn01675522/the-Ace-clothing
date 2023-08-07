//* parent component:
//* 1. App.js

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../components/UI/Button/Button.component";

import Loading from "../../../components/Loading/Loading.component";

import {
  setAdminProductTempData,
  setAdminProductModalOpen,
} from "../../../store/adminProduct/adminProduct.slice";
import { fetchAdminProductAsync } from "../../../store/adminProduct/adminProduct.asyncThunk";

import {
  selectAdminProductIsModalOpen,
  selectAdminProductIsLoading,
  selectAdminProducts,
  selectAdminMensProducts,
  selectAdminWomensProducts,
  selectAdminHatsProducts,
  selectAdminShoesProducts,
  selectAdminAccessoriesProducts,
} from "../../../store/adminProduct/adminProduct.selector";

const CATEGORY = {
  all: "all",
  mens: "mens",
  womens: "womens",
  hats: "hats",
  shoes: "shoes",
  accessories: "accessories",
};

const categoryData = (category) =>
  ({
    [CATEGORY.all]: selectAdminProducts,
    [CATEGORY.mens]: selectAdminMensProducts,
    [CATEGORY.womens]: selectAdminWomensProducts,
    [CATEGORY.hats]: selectAdminHatsProducts,
    [CATEGORY.shoes]: selectAdminShoesProducts,
    [CATEGORY.accessories]: selectAdminAccessoriesProducts,
  }[category]);
//* 根據傳入 category 來決定 return 哪個 selector

const AdminProducts = () => {
  const [createOrEdit, setCreateOrEdit] = useState("create");
  //* modal 視窗選項：建立新商品，或是編輯商品。 edit or create
  const [openWhichModal, setOpenWhichModal] = useState("");
  //* modal 類型選項：products ? coupons ? orders ?
  const [dataType, setDataType] = useState("");
  //* 刪除 modal 選項：products ? coupons ? orders ?
  const [currentPage, setCurrentPage] = useState(1);
  //* 目前頁面的 state
  const isLoading = useSelector(selectAdminProductIsLoading);
  const dispatch = useDispatch();

  const { category } = useParams();

  const products = useSelector(categoryData(category));
  //* 根據 params 來決定要 selector 哪種資料
  const isModalOpen = useSelector(selectAdminProductIsModalOpen);
  const pageCount = Math.ceil(products.length / 10);
  //* 根據產品數量來決定頁數
  const productsInPage = products.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 10,
    currentPage * 10
  );
  //* 根據目前哪一頁來決定來決定要顯示哪筆產品，10 筆資料一頁

  useEffect(() => {
    dispatch(fetchAdminProductAsync());
  }, [dispatch]);
  //* 設定 mounted 的時候 fetch 資料

  const onChangePage = (page) => {
    setCurrentPage(page);
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
      {isLoading && <Loading />}
      {isModalOpen && (
        <ModalPortal
          createOrEdit={createOrEdit}
          openWhichModal={openWhichModal}
          dataType={dataType}
        />
      )}
      <h3 className="admin-products__title">
        產品列表-{category.toUpperCase()}
      </h3>
      <div className="admin-products__actions">
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.rectBlackMe}
          onClick={() => onOpenProductModal("create")}
        >
          建立新商品
        </Button>
      </div>
      <AdminTable
        type={ADMIN_TABLE_TYPE.products}
        items={productsInPage}
        onEdit={onOpenProductModal}
        onDelete={onOpenProductDeleteModal}
      />

      <Pagination
        onChangePage={onChangePage}
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AdminProducts;
