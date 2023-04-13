import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout/FrontLayout";
import Home from "./pages/front/Home/Home";
import Products from "./pages/front/Products/Products";
import ProductDetail from "./pages/front/ProductDetail/ProductDetail";
import Cart from "./pages/front/Cart/Cart";
import Checkout from "./pages/front/Checkout/Checkout";
import Success from "./pages/front/Success/Success";

const App = () => {
  return (
    <div className="App">
      <Routes>
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
