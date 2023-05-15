import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Products.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import Loading from "../../../components/Loading/Loading";
import ProductCard from "../../../components/ProductCard/ProductCard.component";

import {
  fetchUserProductAsync,
  fetchUserProductAsyncTest,
} from "../../../store/userProduct/userProduct.actions";
import {
  selectUserProduct,
  selectUserProductPagination,
  selectUserProductIsLoading,
  selectUserProductMens,
} from "../../../store/userProduct/userProduct.selector";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectUserProduct);
  const pagination = useSelector(selectUserProductPagination);
  const isLoading = useSelector(selectUserProductIsLoading);
  const mens = useSelector(selectUserProductMens);
  const { category } = useParams();

  console.log("inside PRODUCTS", mens);

  const changePage = (page) => {
    dispatch(fetchUserProductAsyncTest());
  };

  // const test = async () => {
  //   const res = await axios.get(
  //     `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
  //   );
  //   console.log(res);
  // };

  console.log(products);

  useEffect(() => {
    dispatch(fetchUserProductAsyncTest());
  }, []);
  //todo 暫時先停下，目前已完成分類邏輯，實際畫面顯現及 redux 部分還待修改
  return (
    <div className="products">
      {isLoading && <Loading />}
      <h1 className="products__title">{category}</h1>
      <div className="products__content">
        {products.map((product, i) => {
          return <ProductCard product={product} key={i} urlParam={category} />;
        })}
      </div>
      <nav className="d-flex justify-content-center">
        <Pagination pagination={pagination} onChangePage={changePage} />
      </nav>
    </div>
  );
};

export default Products;
