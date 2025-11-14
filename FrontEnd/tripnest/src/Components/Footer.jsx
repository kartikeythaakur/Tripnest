import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "40px 20px",
        marginTop: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo + About */}
        <div style={{ flex: "1 1 250px" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#38bdf8",
              marginBottom: "10px",
            }}
          >
            TripNest
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
            Discover beautiful destinations, unique stays, and unforgettable
            experiences. Book your next adventure with ease and comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: "1 1 180px" }}>
          <h4 style={{ marginBottom: "10px", color: "#38bdf8" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Home", "Destinations", "Trips", "Contact", "About"].map(
              (link) => (
                <li key={link} style={{ marginBottom: "6px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#cbd5e1",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "#38bdf8")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "#cbd5e1")
                    }
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ flex: "1 1 220px" }}>
          <h4 style={{ marginBottom: "10px", color: "#38bdf8" }}>Contact</h4>
          <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "6px 0" }}>
            📍 Hamirpur, Himachal Pradesh, India
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "6px 0" }}>
            📞 +91 98765 43210
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "6px 0" }}>
            ✉️ support@tripnest.com
          </p>
        </div>

        {/* Socials */}
        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ marginBottom: "10px", color: "#38bdf8" }}>Follow Us</h4>
          <div style={{ display: "flex", gap: "12px", fontSize: "20px" }}>
            {["🌐", "📸", "🐦", "💼"].map((icon, i) => (
              <span
                key={i}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr
        style={{
          margin: "30px auto",
          border: "none",
          borderTop: "1px solid #1e293b",
          maxWidth: "1200px",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "13px",
        }}
      >
        © {new Date().getFullYear()} TripNest. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
