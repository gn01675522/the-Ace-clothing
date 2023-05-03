import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts/AdminProducts.component";
import AdminCoupons from "./pages/admin/AdminCoupons/AdminCoupons.component";
import AdminOrders from "./pages/admin/AdminOrders/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout/FrontLayout";
import Home from "./pages/front/Home/Home.component";
import Products from "./pages/front/Products/Products";
import ProductDetail from "./pages/front/ProductDetail/ProductDetail";
import Cart from "./pages/front/Cart/Cart";
import Checkout from "./pages/front/Checkout/Checkout";
import Success from "./pages/front/Success/Success";
import NavBar from "./components/Navbar/Navbar.component";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="testRoute" element={<Home />}></Route>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success/:orderId" element={<Success />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
