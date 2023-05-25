import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.component";
import Dashboard from "./pages/admin/Dashboard/Dashboard.component";
import AdminProducts from "./pages/admin/AdminProducts/AdminProducts.component";
import AdminCoupons from "./pages/admin/AdminCoupons/AdminCoupons.component";
import AdminOrders from "./pages/admin/AdminOrders/AdminOrders.component";
import FrontLayout from "./pages/front/FrontLayout/FrontLayout.component";
import Home from "./pages/front/Home/Home.component";
import Products from "./pages/front/Products/Products.component";
import ProductDetail from "./pages/front/ProductDetail/ProductDetail.component";
import Cart from "./pages/front/Cart/Cart.component";
import Checkout from "./pages/front/Checkout/Checkout.component";
import Success from "./pages/front/Success/Success.component";
import Categories from "./components/Categories/Categories.component";

const App = () => {
  return (
    <div className="App">
      <Routes>
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
          <Route path="products" element={<Categories />} />
          <Route path="products/:category" element={<AdminProducts />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

// todo message 需要改變 style，目前的樣式太醜
