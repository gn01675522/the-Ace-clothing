import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";

import NavBar from "../../../components/Navbar/Navbar";

import { fetchCartItemsAsync } from "../../../store/cart/cart.actions";

const FrontLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <Link href="#" className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontLayout;
