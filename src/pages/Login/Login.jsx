import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Loading from "../../components/Loading/Loading";

import { setCurrentUserAsync } from "../../store/user/user.actions";
import { selectUserLoginIsSuccess } from "../../store/user/user.selector";
import { selectUserLoginIsLoading } from "../../store/user/user.selector";
import { selectUserLoginMessage } from "../../store/user/user.selector";

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

  const submit = () => {
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
    <div className="container py-5">
      {isLoading && <Loading isLoading="true" />}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>登入帳號</h2>

          <div
            className={`alert alert-danger ${message ? "d-block" : "d-none"}`}
            role="alert"
          >
            {message}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label w-100">
              Email
              <input
                id="email"
                className="form-control"
                name="username"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label w-100">
              密碼
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="name@example.com"
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>
            登入
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
