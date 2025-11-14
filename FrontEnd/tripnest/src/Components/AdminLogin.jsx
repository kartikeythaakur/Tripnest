import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password)
      return toast.warning("Please fill all the fields");
    const payload = {
      email: userData.email,
      password: userData.password,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        payload
      );
      const token = res?.data?.token;
      localStorage.setItem('adminToken',token);
      toast.success(res?.data?.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
        // fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px 35px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#1e40af",
            fontSize: "26px",
            marginBottom: "25px",
            fontWeight: "700",
          }}
        >
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "14px",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px", textAlign: "left" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "14px",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
               name="password"
              value={userData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(90deg, #2563eb, #1e40af)",
              border: "none",
              color: "white",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              marginTop: "20px",
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            Don't have an account?
            <Link
              to="/admin/signup"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                marginLeft: "5px",
              }}
            >
              Sign up
            </Link>
          </p>

          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            Forgot password?
            <Link
              href="#"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                marginLeft: "5px",
              }}
            >
              Reset here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
