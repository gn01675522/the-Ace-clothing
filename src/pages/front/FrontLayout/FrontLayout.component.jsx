import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import NavBar from "../../../components/Navbar/Navbar.component";
import Footer from "../../../components/Footer/Footer.component";

import { fetchCartItemsAsync } from "../../../store/cart/cart.asyncThunk";

const FrontLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontLayout;
