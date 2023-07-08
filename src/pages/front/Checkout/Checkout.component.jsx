import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import OrderCard from "../../../components/OrderCard/OrderCard.component";
import SummaryCard from "../../../components/SummaryCard/SummaryCard.component";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const cartItems = useSelector(selectCartItems);
  const orderId = useSelector(selectUserOrderId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(setPostUserOrderAsync(data));
  };

  useEffect(() => {
    if (orderId !== null) {
      navigate(`/success/${orderId}`);
    }
  }, [orderId, navigate]);

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
      <div className="checkout__info">
        <OrderCard products={cartItems?.carts} />
        <SummaryCard total={cartItems?.final_total} />
      </div>
    </div>
  );
};

export default Checkout;
