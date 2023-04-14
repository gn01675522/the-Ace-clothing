import { useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Message from "../../../components/Message/Message";

import { selectHasMessage } from "../../../store/message/message.selector";

const DASHBOARD_OPTIONS = [
  { id: "1", title: "產品列表", route: "products" },
  { id: "2", title: "優惠卷列表", route: "coupons" },
  { id: "3", title: "訂單列表", route: "orders" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const hasMessage = useSelector(selectHasMessage);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];
  //* 擷取瀏覽器 token

  axios.defaults.headers.common["Authorization"] = token;
  //* axios 預設 headers 必須夾帶 Auth token

  const logout = () => {
    document.cookie = `hexToken=;`;
    navigate("/login");
  };
  //* 登出功能

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    (async () => {
      try {
        await axios.post("/v2/api/user/check");
      } catch (error) {
        console.log(error);
        if (!error.response.data.success) {
          navigate("/login");
        }
      }
    })();
  }, [navigate, token]);

  return (
    <>
      {hasMessage && <Message />}
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <p className="text-white mb-0">the One 後台管理系統</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="bg-light" style={{ width: "200px" }}>
          <ul className="list-group list-group-flush">
            {DASHBOARD_OPTIONS.map((option) => {
              return (
                <Link
                  key={option.id}
                  className="list-group-item list-group-item-action py-3"
                  to={`/admin/${option.route}`}
                >
                  <i className="bi bi-cup-fill me-2" />
                  {option.title}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="w-100">{token && <Outlet />}</div>
      </div>
    </>
  );
};

export default Dashboard;
