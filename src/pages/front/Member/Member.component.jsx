import { useState, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./Member.styles.scss";

const options = [
  { id: 1, title: "願望清單", route: "/member/wishlist" },
  { id: 2, title: "我的訂單", route: "/member/order-detail" },
];

const Member = () => {
  const [email, setEmail] = useState("");
  const userEmail = useRef();

  const onSearchOrder = (e) => {
    e.preventDefault();
    setEmail(userEmail.current.value);
  };

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
          <Outlet props={email} />
        </div>
      </div>
    </div>
  );
};

export default Member;
