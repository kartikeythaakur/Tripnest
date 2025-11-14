import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { decode } from "../Helper/decode";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  const user = decode(token);

  // const bookings = [
  //   { id: 1, property: "Mountain View Cottage", date: "2025-01-14" },
  //   { id: 2, property: "Beach Resort", date: "2025-02-02" },
  // ];

  // const getUser = async () => {
  //   try {
  //     const res = axios.get(
  //       `${process.env.REACT_APP_API_URL}/user/user-details`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setUserData(res.data);
  //   } catch (error) {
  //     console.error(error.response.data.message);
  //   }
  // };

  const getBookings = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/booking/getbookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(res.data);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  };

  useEffect(() => {
    getBookings();
  }, [token]);

  console.log(bookings);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "600" }}>My Account</h2>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          gap: "10px",
          borderBottom: "2px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        <button
          onClick={() => setActiveTab("profile")}
          style={{
            padding: "10px 20px",
            border: "none",
            background: activeTab === "profile" ? "#1e3a8a" : "#e5e7eb",
            color: activeTab === "profile" ? "#fff" : "#000",
            cursor: "pointer",
            borderRadius: "6px",
            fontWeight: "600",
          }}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveTab("bookings")}
          style={{
            padding: "10px 20px",
            border: "none",
            background: activeTab === "bookings" ? "#1e3a8a" : "#e5e7eb",
            color: activeTab === "bookings" ? "#fff" : "#000",
            cursor: "pointer",
            borderRadius: "6px",
            fontWeight: "600",
          }}
        >
          Bookings
        </button>

        <button
          onClick={() => setActiveTab("edit")}
          style={{
            padding: "10px 20px",
            border: "none",
            background: activeTab === "edit" ? "#1e3a8a" : "#e5e7eb",
            color: activeTab === "edit" ? "#fff" : "#000",
            cursor: "pointer",
            borderRadius: "6px",
            fontWeight: "600",
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "600" }}>
            Personal Details
          </h3>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#f3f4f6",
              lineHeight: "1.8",
            }}
          >
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
            {/* <p>
              <b>Phone:</b> {user.phone}
            </p> */}
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {bookings.length > 0 && activeTab === "bookings" ? (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "600" }}>My Bookings</h3>

          {bookings.length === 0 ? (
            <p style={{ marginTop: "20px" }}>No bookings yet.</p>
          ) : (
            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {bookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: "20px",
                    background: "#e0e7ff",
                    borderRadius: "10px",
                    border: "1px solid #c7d2fe",
                  }}
                >
                  <h4 style={{ marginBottom: "10px" }}>{b.property}</h4>
                  <p>
                    <b>Date:</b> {b.date}
                  </p>
                  <button
                    style={{
                      marginTop: "15px",
                      padding: "8px 15px",
                      background: "#1e3a8a",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h3 style={{
          textAlign:"center",
          fontWeight: "bold",
          marginTop:"30px"
        }}>No bookings found</h3>
      )}

      {/* Edit Profile Tab */}
      {activeTab === "edit" && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ fontSize: "24px", fontWeight: "600" }}>Edit Profile</h3>

          <form
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f3f4f6",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <input
              type="text"
              defaultValue={user.name}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="email"
              defaultValue={user.email}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="text"
              defaultValue={user.phone}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#1e3a8a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
