import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Pagination from "../../../components/Pagination/Pagination";
import Loading from "../../../components/Loading/Loading";

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
    <div className="container mt-md-5 mt-3 mb-7">
      {isLoading && <Loading />}
      <div className="row">
        {products.map((product) => {
          return (
            <div className="col-md-3" key={product.id}>
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-0 object-cover"
                  height={300}
                  alt="..."
                />
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-2">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h4>
                  <p className="card-text text-muted mb-0">{product.content}</p>
                  <p className="text-muted mt-3">NT$ {product.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <nav className="d-flex justify-content-center">
        <Pagination pagination={pagination} changePage={changePage} />
      </nav>
    </div>
  );
};

export default Products;
