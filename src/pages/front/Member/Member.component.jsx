import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import "./Member.styles.scss";

import OrderDetail from "../OrderDetail/OrderDetail.component";
import Wishlist from "../Wishlist/Wishlist.component";

import { fetchUserOrderDataAsync } from "../../../store/userOrder/userOrder.actions";

const options = [
  { id: 1, title: "願望清單", route: "/member/wishlist" },
  { id: 2, title: "我的訂單", route: "/member/order-detail" },
];

const OPTION_TYPES = {
  wishlist: "wishlist",
  orderDetail: "order-detail",
};

const memberOption = (option) =>
  ({
    [OPTION_TYPES.wishlist]: Wishlist,
    [OPTION_TYPES.orderDetail]: OrderDetail,
  }[option]);

const Member = () => {
  const [email, setEmail] = useState("");
  const userEmail = useRef();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const RenderOption = memberOption(routeParams.option);

  const onSearchOrder = (e) => {
    e.preventDefault();
    setEmail(userEmail.current.value);
  };

  useEffect(() => {
    dispatch(fetchUserOrderDataAsync());
  }, [dispatch]);

  return (
    <div className="member">
      <h1 className="member__title">客戶資訊</h1>
      <form className="member__function" onSubmit={onSearchOrder}>
        <input placeholder="請輸入電子信箱" type="search" ref={userEmail} />
        <button type="submit">查詢</button>
      </form>
      <div className="member__tab">
        <div className="member__tab-nav">
          {options.map((option, i) => (
            <NavLink
              to={option.route}
              className={`member__tab-nav-item${
                i === options.length - 1 ? " member__tab-nav-item-last" : ""
              }`}
              key={option.id}
            >
              {option.title}
            </NavLink>
          ))}
        </div>
        <div className="member__tab-content">
          <RenderOption userEmail={email} />
        </div>
      </div>
    </div>
  );
};

export default Member;
