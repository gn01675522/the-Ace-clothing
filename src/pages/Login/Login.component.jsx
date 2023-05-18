import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Login.styles.scss";

import { ReactComponent as AceLogo } from "../../assets/ace.svg";
import Loading from "../../components/Loading/Loading";

import { setCurrentUserAsync } from "../../store/user/user.actions";
import {
  selectUserLoginIsSuccess,
  selectUserLoginIsLoading,
  selectUserLoginMessage,
} from "../../store/user/user.selector";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSuccess = useSelector(selectUserLoginIsSuccess);
  const isLoading = useSelector(selectUserLoginIsLoading);
  const message = useSelector(selectUserLoginMessage);
  // 透過 selector 取得目前 user redux 資訊

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // 取得 user 輸入資料

  const onSubmitHandler = () => {
    dispatch(setCurrentUserAsync(data));
  };
  // 點選登入後，使用 redux 來登入

  useEffect(() => {
    if (isSuccess === true) {
      navigate("/admin/products");
    }
  }, [isSuccess, navigate]);

  // 如果 user 登入成功，那麼就轉址去 products

  return (
    <div className="login">
      {isLoading && <Loading />}
      <div className="login__info">
        <AceLogo className="login__info-logo" />
        <h1 className="login__info-title">the ACE</h1>
      </div>
      <div className="login__actions">
        <h2 className="login__actions-title">登入資訊</h2>
        <div
          className={`login__alert ${message ? "login__alert--error" : ""}`}
          role="alert"
        >
          {message}
        </div>

        <div className="login__actions-items">
          <label htmlFor="email" className="login__actions-items-label">
            帳號
          </label>
          <input
            id="email"
            className="login__actions-items-email"
            name="username"
            type="email"
            placeholder="請輸入電子信箱"
            autoComplete="username"
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="login__actions-items">
          <label htmlFor="password" className="login__actions-items-label">
            密碼
          </label>
          <input
            type="password"
            className="login__actions-items-password"
            name="password"
            id="password"
            placeholder="請輸入密碼"
            autoComplete="current-password"
            onChange={handleChange}
            required={true}
          />
        </div>
        <button
          type="button"
          className="login__actions-btn"
          onClick={onSubmitHandler}
          onKeyDown={onSubmitHandler}
        >
          登入
        </button>
      </div>
    </div>
  );
};

export default Login;
