import { useState, useEffect } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Products.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import Loading from "../../../components/Loading/Loading.component";
import ProductCard from "../../../components/ProductCard/ProductCard.component";

import { fetchUserProductAsync } from "../../../store/userProduct/userProduct.actions";
import {
  selectUserProductIsLoading,
  selectUserProducts,
  selectUserMensProducts,
  selectUserWomensProducts,
  selectUserHatsProducts,
  selectUserShoesProducts,
  selectUserAccessoriesProducts,
} from "../../../store/userProduct/userProduct.selector";

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
    [CATEGORY.all]: selectUserProducts,
    [CATEGORY.mens]: selectUserMensProducts,
    [CATEGORY.womens]: selectUserWomensProducts,
    [CATEGORY.hats]: selectUserHatsProducts,
    [CATEGORY.shoes]: selectUserShoesProducts,
    [CATEGORY.accessories]: selectUserAccessoriesProducts,
  }[category]);
//* 根據傳入 category 來決定 return 哪個 selector

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { category } = useParams();
  const isLoading = useSelector(selectUserProductIsLoading);

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, [dispatch]);

  const products = useSelector(categoryData(category));

  const productsInPage = useMemo(() => {
    return products.slice(
      currentPage === 1 ? 0 : (currentPage - 1) * 12,
      currentPage * 12
    );
  }, [products, currentPage]);

  const pageCount = Math.ceil(products.length / 12);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);
  //* 若路由有改變則重新設定 setCurrentPage，不然切換路由時，currentPage 不會重置

  return (
    <div className="products">
      {isLoading && <Loading />}
      <h1 className="products__title">{category}</h1>
      <div className="products__content">
        {productsInPage.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              urlParam={category}
            />
          );
        })}
      </div>
      <nav className="d-flex justify-content-center">
        <Pagination
          currentPage={currentPage}
          onChangePage={changePage}
          pageCount={pageCount}
        />
      </nav>
    </div>
  );
};

export default Products;
