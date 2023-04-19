import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  setRemoveItemToCartAsync,
  setUpdateCartItemAsync,
} from "../../../store/cart/cart.actions";
import {
  selectCartItems,
  selectCartLoadingItems,
} from "../../../store/cart/cart.selector";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const loadingItems = useSelector(selectCartLoadingItems);

  const removeCartItem = (id) => {
    dispatch(setRemoveItemToCartAsync(id));
  };
  //* 移除購物車單項物件

  const updateCartItem = (item, quantity) => {
    dispatch(setUpdateCartItemAsync(item, quantity, loadingItems));
  };
  //* 透過下拉式選單選擇數量

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-6 bg-white py-5"
          style={{ minHeight: "calc(100vh - 56px - 76px)" }}
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">您的購物車項目</h2>
          </div>
          {cartItems?.carts?.map((item) => {
            return (
              <div className="d-flex mt-4 bg-light" key={item.id}>
                <img
                  src={item.product.imageUrl}
                  className="object-cover"
                  alt=""
                  style={{
                    width: "120px",
                  }}
                />
                <div className="w-100 p-3 position-relative">
                  <button
                    type="button"
                    className="position-absolute btn"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => removeCartItem(item.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <p className="mb-0 fw-bold">{item.product.title}</p>
                  <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                    {item.product.content}
                  </p>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="input-group w-50 align-items-center">
                      <select
                        className="form-select"
                        value={item.qty}
                        disabled={loadingItems.includes(item.id)}
                        // disabled={isLoading}
                        onChange={(e) => {
                          updateCartItem(item, e.target.value * 1);
                        }}
                      >
                        {[...new Array(20)].map((i, num) => {
                          return (
                            <option value={num + 1} key={num}>
                              {num + 1}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <p className="mb-0 ms-auto">NT${item.final_total}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${cartItems.final_total}</p>
          </div>
          <NavLink
            to="/checkout"
            className="btn btn-dark w-100 mt-4 rounded-0 py-3"
          >
            確認商品正確
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
