import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PrivateRouteCustomer } from "./HOC/PrivateRoute";
import {
  AuthorizationHOC,
  isLogin,
  isLoginCustomer,
} from "./HOC/AuthorizationHOC";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Home = React.lazy(() => import("./views/HomePage"));
const ListProducts = React.lazy(() => import("./views/Products"));
const ProductDetails = React.lazy(() => import("./views/ProductDetails"));
const Cart = React.lazy(() => import("./views/Cart"));
const CheckOut = React.lazy(() => import("./views/CheckOut"));
const Order = React.lazy(() => import("./views/Order"));
const LoginCustomer = React.lazy(() => import("./views/LoginCustomer"));
const RegisterCustomer = React.lazy(() => import("./views/RegisterCustomer"));
const OrderHistory = React.lazy(() => import("./views/OrderHistory"));
const Login = React.lazy(() => import("./views/admin/login"));
const Users = React.lazy(() => import("./views/admin/users"));
const Products = React.lazy(() => import("./views/admin/products"));
const Orders = React.lazy(() => import("./views/admin/orders"));
const NotFoundPage = React.lazy(() => import("./views/NotFoundPage"));
const Address = React.lazy(() => import("./views/Account"));

function App() {
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ListProducts />} />
        <Route path="/product_details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={isLoginCustomer(LoginCustomer)} />
        <Route path="/register" element={isLoginCustomer(RegisterCustomer)} />
        <Route path="/admin/login" element={isLogin(Login)} />
        <Route path="/admin" element={isLogin(Login)} />
        <Route element={<PrivateRouteCustomer />}>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order_history" element={<OrderHistory />} />
          <Route path="/address" element={<Address />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/admin/users" element={AuthorizationHOC(Users)} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
