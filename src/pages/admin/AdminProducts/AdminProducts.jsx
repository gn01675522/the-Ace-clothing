import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProductModal from "../../../components/ProductModal/ProductModal";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Pagination from "../../../components/Pagination/Pagination";
import { Modal } from "bootstrap";

import {
  fetchAdminProductAsync,
  deleteAdminProductAsync,
  setAdminProductModalOpen,
} from "../../../store/adminProduct/adminProduct.actions";
import {
  selectAdminProducts,
  selectAdminProductPagination,
  selectAdminProductIsLoading,
} from "../../../store/adminProduct/adminProduct.selector";

const AdminProducts = () => {
  const [type, setType] = useState("create");
  // type: 決定 modal 展開的用途
  const [tempProduct, setTempProduct] = useState({});
  const dispatch = useDispatch();
  const productModal = useRef(null);
  const deleteModal = useRef(null);
  const products = useSelector(selectAdminProducts);
  const pagination = useSelector(selectAdminProductPagination);
  const isDeleteModalOpen = useSelector(selectAdminProductIsLoading);

  useEffect(() => {
    productModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });
    dispatch(fetchAdminProductAsync());
  }, []);
  //* 設定 modal 背景為不可動，以及於 mounted 的時候 fetch 資料

  const changePage = (page) => {
    dispatch(fetchAdminProductAsync(page));
  };
  //* 透過 api 取得切換頁面後的產品資料

  // const deleteProduct = (id) => {
  //   dispatch(deleteAdminProductAsync(id));
  //   dispatch(setAdminProductModalOpen(false));
  // };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      console.log("inside AdminProducts", res.data);
      if (res.data.success) {
        dispatch(fetchAdminProductAsync());
        deleteModal.current.hide();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  //* 透過 api 刪除產品資料

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };
  //* 開啟編輯 modal

  const closeProductModal = () => {
    productModal.current.hide();
  };
  //* 關閉編輯 modal

  const openDeleteModal = (product) => {
    setTempProduct(product);
    // dispatch(setAdminProductModalOpen());
    deleteModal.current.show();
  };
  //* 打開刪除 modal

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };
  //* 關閉刪除 modal

  return (
    <div className="p-3">
      <ProductModal
        closeProductModal={closeProductModal}
        tempProduct={tempProduct}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempProduct.title}
        handleDelete={deleteProduct}
        id={tempProduct.id}
      />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openProductModal("create", {})}
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
                    onClick={() => openProductModal("edit", product)}
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
      <Pagination changePage={changePage} pagination={pagination} />
    </div>
  );
};

export default AdminProducts;
