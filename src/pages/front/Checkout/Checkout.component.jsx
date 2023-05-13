import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../../../components/UI/Input/Input.component";

import "./Checkout.styles.scss";

import { selectCartItems } from "../../../store/cart/cart.selector";
import { selectUserOrderId } from "../../../store/userOrder/userOrder.selector";
import { setPostUserOrderAsync } from "../../../store/userOrder/userOrder.actions";

const formContent = [
  { id: "name", config: { type: "text", labelText: "姓名" } },
  { id: "tel", config: { type: "tel", labelText: "電話" } },
  { id: "email", config: { type: "email", labelText: "email" } },
  { id: "address", config: { type: "text", labelText: "地址" } },
];

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderId = useSelector(selectUserOrderId);

  const onSubmit = async (data) => {
    dispatch(setPostUserOrderAsync(data));
    navigate(`/success/${orderId}`);
  };

  return (
    <div className="checkout">
      <form className="checkout__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="checkout__form-title">付款資訊</h1>
        <div className="checkout__form-group">
          {formContent.map(({ id, config }) => (
            <div className="checkout__form-item" key={id}>
              <Input
                id={id}
                config={config}
                errors={errors}
                register={register}
              />
            </div>
          ))}
        </div>
        <div className="checkout__form-actions">
          <Link className="checkout__form-actions-back" to="/cart">
            返回購物車
          </Link>
          <button type="submit" className="checkout__form-actions-submit">
            送出訂單
          </button>
        </div>
      </form>

      <div className="checkout__cart">
        <h2 className="checkout__cart-title">訂單商品</h2>
        <div className="checkout__cart-content">
          {cartItems?.carts?.map((item) => {
            return (
              <div className="checkout__cart-item" key={item.id}>
                <img
                  src={item.product.imageUrl}
                  alt=""
                  className="checkout__cart-item-img"
                />
                <div className="checkout__cart-item-info">
                  <div className="d-flex justify-content-between fw-bold">
                    <p className="mb-0">
                      {item.product.title}x{item.qty}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">NT$ {item.final_total}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="checkout__cart-summary">
            <div className="checkout__cart-summary-subtotal">
              <span>小計</span>
              <span>NT${cartItems.final_total}</span>
            </div>
            <div className="checkout__cart-summary-shipping">
              <span>運費</span>
              <span>NT$免費</span>
            </div>
            <div className="checkout__cart-summary-total">
              <span>總金額</span>
              <span>NT${cartItems.final_total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
