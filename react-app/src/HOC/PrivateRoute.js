import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ components: component, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/admin/login" />;
};

const PrivateRouteCustomer = ({ components: component, ...rest }) => {
  const token = localStorage.getItem("token_customer");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export  {PrivateRoute,PrivateRouteCustomer };
