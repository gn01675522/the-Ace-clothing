import { useState, useEffect } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Products.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import Loading from "../../../components/Loading/Loading.component";
import ProductCard from "../../../components/ProductCard/ProductCard.component";
import Message from "../../../components/Message/Message.component";

import { clearUserProduct } from "../../../store/userProduct/userProduct.slice";
import { fetchUserProductAsync } from "../../../store/userProduct/userProduct.asyncThunk";

import {
  selectUserProductIsLoading,
  selectUserProducts,
  selectUserMensProducts,
  selectUserWomensProducts,
  selectUserHatsProducts,
  selectUserShoesProducts,
  selectUserAccessoriesProducts,
  selectUrbanProducts,
  selectBohemianProducts,
} from "../../../store/userProduct/userProduct.selector";

import { selectUserFavorite } from "../../../store/user/user.selector";

import { selectHasMessage } from "../../../store/message/message.selector";

const CATEGORY = {
  all: "all",
  mens: "mens",
  womens: "womens",
  hats: "hats",
  shoes: "shoes",
  accessories: "accessories",
  urban: "urban",
  bohemian: "bohemian",
};
//* 定義 category type

const getProducts = (category) =>
  ({
    [CATEGORY.all]: selectUserProducts,
    [CATEGORY.mens]: selectUserMensProducts,
    [CATEGORY.womens]: selectUserWomensProducts,
    [CATEGORY.hats]: selectUserHatsProducts,
    [CATEGORY.shoes]: selectUserShoesProducts,
    [CATEGORY.accessories]: selectUserAccessoriesProducts,
    [CATEGORY.urban]: selectUrbanProducts,
    [CATEGORY.bohemian]: selectBohemianProducts,
  }[category]);
//* 根據傳入 category 來決定 return 哪個 selector

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserProductIsLoading);
  const hasMessage = useSelector(selectHasMessage);
  const wishlist = useSelector(selectUserFavorite);
  const products = useSelector(getProducts(category));
  const pageTitle =
    category === "mens"
      ? "男裝"
      : category === "womens"
      ? "女裝"
      : category === "shoes"
      ? "鞋子"
      : category === "hats"
      ? "帽子"
      : category === "bohemian"
      ? "Bohemian"
      : category === "urban"
      ? "Urban"
      : "飾品";

  const pageCount = Math.ceil(products.length / 12);
  // 一個頁面總共渲染 12 個 ProductCard，所以將所有資料除以 12 即可得到總共有幾頁

  const productsInPage = useMemo(() => {
    return products.slice(
      currentPage === 1 ? 0 : (currentPage - 1) * 12,
      currentPage * 12
    );
  }, [products, currentPage]);
  // 根據頁面數量來做資料切割

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchUserProductAsync());
    return () => dispatch(clearUserProduct());
  }, [dispatch]);
  // 結束時清空 redux，不然會有洩漏問題

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);
  //* 若路由有改變則重新設定 setCurrentPage，不然切換路由時，currentPage 不會重置

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  // selector 變動時則將 wishlist 內容放入 localStorage 裡面

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="products">
      {hasMessage && <Message />}
      {isLoading && <Loading />}
      <h1 className="products__title">{pageTitle}</h1>
      <div className="products__content">
        {productsInPage.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              urlParam={category}
              isFavorite={wishlist.includes(product.id)}
            />
          );
        })}
      </div>
      <nav className="products__function">
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          pageCount={pageCount}
        />
      </nav>
    </div>
  );
};

export default Products;
