import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decode } from "../Helper/decode";

const AdminPublic = () => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    const tokenData = decode(token);
    if (tokenData && tokenData.role === "superadmin") {
      return <Navigate to="/dashboard" replace />;
    }
  }
  return <Outlet />;
};

export default AdminPublic;
