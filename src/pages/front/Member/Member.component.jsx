import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";

import "./Member.styles.scss";

import OrderDetail from "../OrderDetail/OrderDetail.component";
import Wishlist from "../Wishlist/Wishlist.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../components/UI/Button/Button.component";

import { fetchUserOrderDataAsync } from "../../../store/userOrder/userOrder.actions";
import { fetchUserProductAsync } from "../../../store/userProduct/userProduct.actions";
import { setUserFavorite } from "../../../store/user/user.actions";

import { selectUserProducts } from "../../../store/userProduct/userProduct.selector";
import { selectUserFavorite } from "../../../store/user/user.selector";

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
  const wishlistInLocalStorage = useSelector(selectUserFavorite);
  const products = useSelector(selectUserProducts);
  const wishlist = wishlistInLocalStorage.reduce((acc, item) => {
    const product = products.find((product) => product.id === item);
    if (product) {
      acc.push(product);
    }
    return acc;
  }, []);

  const onSearchOrder = (e) => {
    e.preventDefault();
    setEmail(userEmail.current.value);
  };

  const onRemoveFavorite = (id) => {
    const removeFavorite = wishlistInLocalStorage.filter((item) => item !== id);
    dispatch(setUserFavorite(removeFavorite));
  };

  useEffect(() => {
    dispatch(fetchUserOrderDataAsync());
    dispatch(fetchUserProductAsync());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistInLocalStorage));
  }, [wishlistInLocalStorage]);

  return (
    <div className="member">
      <h1 className="member__title">客戶資訊</h1>
      {routeParams.option === "order-detail" && (
        <form className="member__function" onSubmit={onSearchOrder}>
          <input placeholder="請輸入電子信箱" type="search" ref={userEmail} />
          <Button type="submit" buttonType={BUTTON_TYPE_CLASS.search}>
            查詢
          </Button>
        </form>
      )}
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
          <RenderOption
            data={routeParams.option === "order-detail" ? email : wishlist}
            func={onRemoveFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default Member;
