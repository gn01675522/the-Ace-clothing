import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts/AdminProducts.component";
import AdminCoupons from "./pages/admin/AdminCoupons/AdminCoupons.component";
import AdminOrders from "./pages/admin/AdminOrders/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout/FrontLayout";
import Home from "./pages/front/Home/Home.component";
import Products from "./pages/front/Products/Products.component";
import ProductDetail from "./pages/front/ProductDetail/ProductDetail.component";
import Cart from "./pages/front/Cart/Cart.component";
import Checkout from "./pages/front/Checkout/Checkout";
import Success from "./pages/front/Success/Success";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="testRoute" element={<Products />}></Route>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="products/:category/:id" element={<ProductDetail />} />
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
