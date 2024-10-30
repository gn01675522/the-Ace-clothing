import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const Login = lazy(() => import("./pages/Login/Login.component"));
const Dashboard = lazy(() =>
  import("./pages/admin/Dashboard/Dashboard.component")
);
const AdminProducts = lazy(() =>
  import("./pages/admin/AdminProducts/AdminProducts.component")
);
const AdminCoupons = lazy(() =>
  import("./pages/admin/AdminCoupons/AdminCoupons.component")
);
const AdminOrders = lazy(() =>
  import("./pages/admin/AdminOrders/AdminOrders.component")
);
const FrontLayout = lazy(() =>
  import("./pages/front/FrontLayout/FrontLayout.component")
);
const Home = lazy(() => import("./pages/front/Home/Home.component"));
const Products = lazy(() =>
  import("./pages/front/Products/Products.component")
);
const ProductDetail = lazy(() =>
  import("./pages/front/ProductDetail/ProductDetail.component")
);
const Cart = lazy(() => import("./pages/front/Cart/Cart.component"));
const Checkout = lazy(() =>
  import("./pages/front/Checkout/Checkout.component")
);
const Success = lazy(() => import("./pages/front/Success/Success.component"));
const Categories = lazy(() =>
  import("./components/Categories/Categories.component")
);
const AboutUs = lazy(() => import("./pages/front/AboutUs/AboutUs.component"));
const InfoSource = lazy(() =>
  import("./pages/front/InfoSource/InfoSource.component")
);
const Member = lazy(() => import("./pages/front/Member/Member.component"));

const App = () => {
  return (
    <div className="App">
      <Suspense>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<Home />} />
            <Route path=":category" element={<Products />} />
            <Route path=":category/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success/:orderId" element={<Success />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="info-source" element={<InfoSource />} />
            <Route path="member/:option" element={<Member />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<Navigate to="products" />} />
            <Route path="products" element={<Categories />} />
            <Route path=":category" element={<AdminProducts />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
