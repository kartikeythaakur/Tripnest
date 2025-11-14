import React, { useState } from "react";
import Addproperty from "./Addproperty";
import ViewProperties from "./ViewProperties";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AdminBookings from "./GetAdminBookings";

function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [totalProperties, setTotalProperties] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentBookings , setRecentBookings] = useState(null);
  const [totalRevenue,setTotalRevenue] = useState(0);

  const fetchTotalProperties = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/property/get-total-properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalProperties(res.data.totalProperties);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchTotalBookings = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/booking/get-total-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalBookings(res.data.totalBookings);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/get-total-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalUsers(res.data.totalUsers);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/booking/get-recent-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecentBookings(res.data.recentBookings);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

   const fetchTotalRevenue = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/booking/get-total-revenue`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalRevenue(res.data.totalRevenue);
    } 
    catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  console.log(recentBookings);
  
  useEffect(() => {
    fetchTotalBookings();
    fetchTotalProperties();
    fetchTotalUsers();
    fetchRecentBookings();
    fetchTotalRevenue();
  },[]);


  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "stretch",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          position: "sticky",
          top: "0px",
          alignSelf: "flex-start",
          height: "100vh",
          width: "220px",
          backgroundColor: "#1e3a8a",
          color: "white",
          padding: "20px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>TripNest</h2>

        {["Dashboard", "Bookings", "AddProperty", "ViewProperties"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: active === item ? "#2563eb" : "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                marginBottom: "5px",
              }}
            >
              {item}
            </button>
          )
        )}

        <button
          onClick={() => {
            setActive("Logout");
            localStorage.removeItem("adminToken");
            navigate("/admin/login");
          }}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "auto",
            backgroundColor: active === "Logout" ? "#E34234" : "transparent",
            color: "white",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f3f4f6",
          padding: "0px",
          overflowY: "auto",
        }}
      >
        {active === "Dashboard" && (
          <>
            <div style={{ padding: "30px" }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "20px",
                  color: "#1e3a8a",
                }}
              >
                Admin Dashboard
              </h1>

              {/* Stats Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                {/* Total Properties  */}
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #3b82f6`,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Properties
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#3b82f6",
                      margin: 0,
                    }}
                  >
                    {totalProperties}
                  </p>
                </div>

                {/* Total Bookings  */}
                <div
                  // key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #10b981`,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Bookings
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#10b981",
                      margin: 0,
                    }}
                  >
                    {totalBookings}
                  </p>
                </div>

                {/* Total Users  */}
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #f59e0b`,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Users
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#f59e0b",
                      margin: 0,
                    }}
                  >
                    {totalUsers}
                  </p>
                </div>

                {/* Total Revenue  */}
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #ef4444 `,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Revenue
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#ef4444",
                      margin: 0,
                    }}
                  >
                    {"$" + totalRevenue}
                  </p>
                </div>

                {/* ))} */}
              </div>

              {/* Recent Bookings */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1e3a8a",
                    marginBottom: "15px",
                  }}
                >
                  Recent Bookings
                </h3>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr
                      style={{ backgroundColor: "#f3f4f6", textAlign: "left" }}
                    >
                      <th style={{ padding: "10px" }}>Booking ID</th>
                      {/* <th style={{ padding: "10px" }}>Payment ID</th> */}
                      <th style={{ padding: "10px" }}>Property</th>
                      <th style={{ padding: "10px" }}>Customer</th>
                      {/* <th style={{ padding: "10px" }}>Date</th> */}
                      <th style={{ padding: "10px" }}>Amount</th>
                      <th style={{ padding: "10px" }}>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBookings && recentBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        style={{
                          borderBottom: "1px solid #e5e7eb",
                          backgroundColor: "#fff",
                        }}
                      >
                        <td style={{ padding: "10px" }}>{booking._id}</td>
                        {/* <td style={{ padding: "10px" }}>{booking.paymentInfo.paymentId}</td> */}
                        <td style={{ padding: "10px" }}>{booking.propertyId.name}</td>
                        <td style={{ padding: "10px" }}>{booking.user.name}</td>
                        {/* <td style={{ padding: "10px" }}>{b.date}</td> */}
                        <td style={{ padding: "10px" }}>${booking.amountPaid}</td>
                        <td
                          style={{
                            padding: "10px",
                            color:
                              booking.status === "confirmed"
                                ? "green"
                                : booking.status === "pending"
                                ? "orange"
                                : "red",
                            fontWeight: "600",
                          }}
                        >
                          {booking.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

               {/* Other Property Items  */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                {/* Total Properties  */}
                {/* <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #3b82f6`,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Properties
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#3b82f6",
                      margin: 0,
                    }}
                  >
                    {totalProperties}
                  </p>
                </div> */}

                {/* Total Bookings  */}
                {/* <div
                  // key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #10b981`,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Bookings
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#10b981",
                      margin: 0,
                    }}
                  >
                    {totalBookings}
                  </p>
                </div> */}

                {/* Total Users  */}
                {/* <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #f59e0b`,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Users
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#f59e0b",
                      margin: 0,
                    }}
                  >
                    {totalUsers}
                  </p>
                </div> */}

                {/* Total Revenue  */}
                {/* <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    padding: "20px",
                    textAlign: "center",
                    borderTop: `4px solid #ef4444 `,
                  }}
                >
                  <h3
                    style={{
                      color: "#374151",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Total Revenue
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#ef4444",
                      margin: 0,
                    }}
                  >
                    {"$" + totalRevenue}
                  </p>
                </div> */}

                {/* ))} */}
              </div>

            </div>
          </>
        )}

        {active === "AddProperty" && <Addproperty />}
        {active === "ViewProperties" && <ViewProperties />}
        {active === "Bookings" && <AdminBookings/>}
      </div>
    </div>
  );
}

export default Dashboard;
