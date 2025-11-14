import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false); // 👈 automatically close mobile menu
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if(adminToken){
    return null;
  }

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1e3a8a",
          color: "#e0e7ff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          minHeight: "75px",
          maxHeight: "75px",
          padding: "0 20px",
        }}
      >
        {/* Logo */}
        <div style={{ cursor: "pointer", flex: "1" }}>
          {/* <Link
            // to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          > */}
          <h3 style={{ fontWeight: "600" }}>
            {" "}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              TripNest
            </Link>
          </h3>
        </div>

        {/* Desktop Menu */}
        <ul
          className="desktop-menu"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "25px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/destinations" className="nav-link">
              Destinations
            </Link>
          </li>
          <li>
            <Link to="/trips" className="nav-link">
              Trips
            </Link>
          </li>
          {token && (
            <li>
              <Link to="/bookings" className="nav-link">
                Bookings
              </Link>
            </li>
          )}
          <li>
            <Link to="/aboutus" className="nav-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/help" className="nav-link">
              Help
            </Link>
          </li>

          {token && (
            <AccountCircleIcon
              onClick={() => navigate("/account")}
              style={{
                fontSize: "35px",
              }}
            />
          )}

          {/* Login Button */}
          {!token && (
            <button
              className="login-btn"
              style={{
                padding: "8px 18px",
                border: "none",
                backgroundColor: "#2563eb",
                borderRadius: "8px",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onClick={() => navigate("/login")}
            >
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            </button>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        {!menuOpen && (
          <MenuIcon
            onClick={toggleMenu}
            style={{
              display: "none",
              position: "absolute",
              right: "30px",
              cursor: "pointer",
            }}
            className="mobile-menu-icon"
          />
        )}
      </nav>

      {/* Mobile Slide Menu */}
      <ul
        className="mobile-menu"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          listStyleType: "none",
          position: "fixed",
          backgroundColor: "#1e3a8a",
          top: 0,
          right: 0,
          height: "100vh",
          width: "250px",
          marginTop: "70px",
          padding: "20px",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s ease-in-out",
          zIndex: 2000,
        }}
      >
        <CloseIcon
          style={{
            position: "absolute",
            top: "-43px",
            right: "22px",
            cursor: "pointer",
            color: "white",
          }}
          onClick={toggleMenu}
        />
        <li>
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/destinations" className="nav-link" onClick={toggleMenu}>
            Destinations
          </Link>
        </li>
        <li>
          <Link to="/trips" className="nav-link" onClick={toggleMenu}>
            Trips
          </Link>
        </li>
        {token && (
          <li>
            <Link to="/bookings" className="nav-link" onClick={toggleMenu}>
              Bookings
            </Link>
          </li>
        )}
        <li>
          <Link to="/aboutus" className="nav-link" onClick={toggleMenu}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="/help" className="nav-link" onClick={toggleMenu}>
            Help
          </Link>
        </li>

        <li
          style={{
            color: "white",
          }}
          onClick={() => navigate("/account")}
        >
          <span> Account </span>
          <AccountCircleIcon />
        </li>

        {!token && (
          <button
            className="login-btn"
            style={{
              padding: "8px 18px",
              border: "none",
              backgroundColor: "#2563eb",
              borderRadius: "8px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s ease",
              maxHeight: "50px",
            }}
            onClick={() => {
              toggleMenu();
              navigate("/login");
            }}
          >
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          </button>
        )}
      </ul>

      {/* Internal CSS */}
      <style>
        {`
        .nav-link {
          color: #e0e7ff;
          text-decoration: none;
          font-size: 17px;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: #60a5fa;
          transform: scale(1.05);
        }
        .login-btn:hover {
          transform: scale(1.05);
          background: linear-gradient(90deg, #1e3a8a, #2563eb);
          color: #fff;
        }

        /* Hide desktop menu below 1024px (small & medium screens) */
        @media (max-width: 1024px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-icon {
            display: block !important;
          }
        }
      `}
      </style>
    </>
  );
};

export default Navbar;
