import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Login.styles.scss";

import { ReactComponent as AceLogo } from "../../assets/ace.svg";
import Loading from "../../components/Loading/Loading.component";
import Button, {
  BUTTON_TYPE_CLASS,
} from "../../components/UI/Button/Button.component";
import Message from "../../components/Message/Message.component";

import { selectHasMessage } from "../../store/message/message.selector";
import { setCurrentUserAsync } from "../../store/user/user.asyncThunk";
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
  const hasMessage = useSelector(selectHasMessage);
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
    <>
      {hasMessage && <Message />}
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
          <form className="login__form">
            <div className="login__form-items">
              <label htmlFor="email" className="login__form-items-label">
                帳號
              </label>
              <input
                id="email"
                className="login__form-items-email"
                name="username"
                type="email"
                placeholder="請輸入電子信箱"
                autoComplete="username"
                onChange={handleChange}
                required={true}
              />
            </div>

            <div className="login__form-items">
              <label htmlFor="password" className="login__form-items-label">
                密碼
              </label>
              <input
                type="password"
                className="login__form-items-password"
                name="password"
                id="password"
                placeholder="請輸入密碼"
                autoComplete="current-password"
                onChange={handleChange}
                required={true}
              />
            </div>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASS.rectBlackNm}
              onClick={onSubmitHandler}
              disabled={data.username === "" || data.password === ""}
            >
              登入
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
