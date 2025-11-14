import React from "react";
import { decode } from "../Helper/decode";
import { Outlet, Navigate } from "react-router-dom";


const AdminProtected = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const tokenData = decode(token);

  if (tokenData.role != "superadmin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet/>;
};

export default AdminProtected;
