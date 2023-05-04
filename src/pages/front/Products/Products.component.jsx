import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Products.styles.scss";

import Pagination from "../../../components/Pagination/Pagination.component";
import Loading from "../../../components/Loading/Loading";
import ProductCard from "../../../components/ProductCard/ProductCard.component";

import { fetchUserProductAsync } from "../../../store/userProduct/userProduct.actions";
import {
  selectUserProduct,
  selectUserProductPagination,
  selectUserProductIsLoading,
} from "../../../store/userProduct/userProduct.selector";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectUserProduct);
  const pagination = useSelector(selectUserProductPagination);
  const isLoading = useSelector(selectUserProductIsLoading);

  const changePage = (page) => {
    dispatch(fetchUserProductAsync(page));
  };

  useEffect(() => {
    dispatch(fetchUserProductAsync());
  }, []);

  return (
    <div className="products">
      {isLoading && <Loading />}
      <h1 className="products__title">test</h1>
      <div className="products__content">
        {products.map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </div>
      <nav className="d-flex justify-content-center">
        <Pagination pagination={pagination} onChangePage={changePage} />
      </nav>
    </div>
  );
};

export default Products;
