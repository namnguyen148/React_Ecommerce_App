import React from 'react';
import { Navigate } from "react-router-dom";

function AuthorizationHOC (WrappedComponent) {
  const userString = localStorage.getItem('user');
  const user_detail = JSON.parse(userString);
  if (user_detail  === 'admin') {
    return <WrappedComponent />;
  }
  else {
    return <Navigate to="/admin/products" />;
  }
};

function isLogin (WrappedComponent) {
  const token = localStorage.getItem("token");
  return token ? ( <Navigate to="/admin/products" />) : ( <WrappedComponent />)
};

function isLoginCustomer (WrappedComponent) {
  const token = localStorage.getItem("token_customer");
  return token ? ( <Navigate to="/" />) : ( <WrappedComponent />)
};

export {
  AuthorizationHOC,
  isLogin,
  isLoginCustomer
};
