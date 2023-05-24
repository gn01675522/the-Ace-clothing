import { useState, useEffect } from "react";
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
  selectUserAcessoriesProducts,
} from "../../../store/userProduct/userProduct.selector";

const CATEGORY = {
  all: "all",
  mens: "mens",
  womens: "womens",
  hats: "hats",
  shoes: "shoes",
  acessories: "acessories",
};

const categoryData = (category) =>
  ({
    [CATEGORY.all]: selectUserProducts,
    [CATEGORY.mens]: selectUserMensProducts,
    [CATEGORY.womens]: selectUserWomensProducts,
    [CATEGORY.hats]: selectUserHatsProducts,
    [CATEGORY.shoes]: selectUserShoesProducts,
    [CATEGORY.acessories]: selectUserAcessoriesProducts,
  }[category]);
//* 根據傳入 category 來決定 return 哪個 selector

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { category } = useParams();
  const isLoading = useSelector(selectUserProductIsLoading);

  const products = useSelector(categoryData(category));

  const productsInPage = products.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * 12,
    currentPage * 12
  );
  const pageCount = Math.ceil(products.length / 12);

  console.log("inside PRODUCTS", products);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  // const test = async () => {
  //   const res = await axios.get(
  //     `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
  //   );
  //   console.log(res);
  // };

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, []);
  //todo 暫時先停下，目前已完成分類邏輯，實際畫面顯現及 redux 部分還待修改

  return (
    <div className="products">
      {isLoading && <Loading />}
      <h1 className="products__title">{category}</h1>
      <div className="products__content">
        {productsInPage.map((product, i) => {
          return <ProductCard product={product} key={i} urlParam={category} />;
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
