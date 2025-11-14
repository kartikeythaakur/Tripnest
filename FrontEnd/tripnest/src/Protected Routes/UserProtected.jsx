import React from "react";
import {decode}  from "../Helper/decode";
import { Outlet, Navigate } from "react-router-dom";

const UserProtected = () => {
  const token = localStorage.getItem("token");
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const tokenData = decode(token);

  if (tokenData.role != "user") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtected;
