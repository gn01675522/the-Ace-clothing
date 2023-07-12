import { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./Dashboard.styles.scss";

import Message from "../../../components/Message/Message.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../../components/UI/Button/Button.component";

import { selectHasMessage } from "../../../store/message/message.selector";

const DASHBOARD_OPTIONS = [
  { id: "1", title: "產品列表", route: "products" },
  { id: "2", title: "優惠卷列表", route: "coupons" },
  { id: "3", title: "訂單列表", route: "orders" },
];

const Dashboard = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const navigate = useNavigate();
  const hasMessage = useSelector(selectHasMessage);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];
  //* 擷取瀏覽器 token

  axios.defaults.headers.common["Authorization"] = token;
  //* axios 預設 headers 必須夾帶 Auth token 以便驗證

  const logout = () => {
    document.cookie = `hexToken=;`;
    navigate("/login");
  };
  //* 登出功能，設定 hexToken 為空值

  const onOpenList = () => {
    setIsListOpen(!isListOpen);
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    (async () => {
      try {
        await axios.post("/v2/api/user/check");
      } catch (error) {
        if (!error.response.data.success) {
          navigate("/login");
        }
      }
    })();
  }, [navigate, token]);

  return (
    <>
      {hasMessage && <Message />}
      <input
        className="dashboard__trigger"
        type="checkbox"
        id="dashboard-trigger"
        checked={isListOpen ? true : false}
        onChange={onOpenList}
      />
      <nav className="dashboard-header">
        <label className="dashboard-header__burger" htmlFor="dashboard-trigger">
          <div className="dashboard-header__burger-line" />
        </label>
        <NavLink className="dashboard-header__title" to="/admin/products">
          the Ace 後台管理系統
        </NavLink>
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASS.squareBlackMe}
          onClick={logout}
        >
          登出
        </Button>
      </nav>
      <div className="dashboard-header__blocker" />

      <div className="dashboard-main">
        <div className="dashboard-main__navbar">
          <div className="dashboard-main__navbar-list">
            {DASHBOARD_OPTIONS.map((option) => {
              return (
                <NavLink
                  key={option.id}
                  className="dashboard-main__navbar-list-link"
                  to={`/admin/${option.route}`}
                  onClick={onOpenList}
                >
                  {option.title}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="dashboard-main__content">
          {token && <Outlet />}
          <span className="dashboard-main__content-hint">
            * 請使用平板或桌上型電腦查看，以確保最佳瀏覽體驗。
          </span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
