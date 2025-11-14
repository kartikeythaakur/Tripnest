import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { optimizeImage } from "../Helper/optimizeImage";
import moment from "moment";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/booking/getbookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(res.data.bookings || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  console.log("Booking details", bookings);
  
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
          color: "#1e3a8a",
        }}
      >
        My Bookings
      </h2>

      {bookings.length > 0 ? (
        <div
          id="bookingsContainer"
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {bookings?.map((booking) => (
            <div
              key={booking._id}
              className="booking-card"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                padding: "16px",
                display: "flex",
                gap: "16px",
                background: "#fff",
              }}
            >
              <img 
                className="bookings-image"
                src={optimizeImage(booking.roomType?.images?.[0], 600)}
                alt={booking.roomType?.name || "Room"}
                style={{
                  width: "200px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  {booking.roomType?.name || "Room"}
                </h3>

                <p style={{ margin: "4px 0" }}>
                  <strong>Property:</strong>{" "}
                  {booking?.propertyId?.name}
                </p>

                 <p style={{ margin: "4px 0" }}>
                  <strong>Location:</strong>{" "}
                  {booking?.propertyId?.location}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Check-in:</strong>{" "}
                  {moment(booking?.checkIn).format("DD-MMM-YYYY")}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Check-out:</strong>{" "}
                  {moment(booking?.checkOut).format("DD-MMM-YYYY")}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Total Nights:</strong>{" "}
                  {Math.ceil(
                    (new Date(booking.checkOut) - new Date(booking.checkIn)) /
                      (1000 * 60 * 60 * 24)
                  ) || "—"}
                </p>

                {/* <p style={{ margin: "4px 0" }}>
                  <strong>Total Guests:</strong> {booking.totalGuests || "—"}
                </p> */}

                <p style={{ margin: "4px 0" }}>
                  <strong>
                    {booking?.status !== "confirmed"
                      ? `To pay:`
                      : "Price Paid: "}
                    :{" "}
                  </strong>{" "}
                  <span style={{ color: "green" }}>${booking?.amountPaid}</span>
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        booking?.status === "confirmed"
                          ? "green"
                          : booking?.status === "pending"
                          ? "orange"
                          : "red",
                      fontWeight: "500",
                    }}
                  >
                    {booking?.status || "pending"}
                  </span>
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Payment Order ID:</strong>{" "}
                  {booking.paymentInfo?.orderId || "—"}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Payment ID:</strong>{" "}
                  {booking.paymentInfo?.paymentId || "—"}
                </p>
              </div>


            </div>
          ))}
        </div>
      ): (
         <p style={{ textAlign: "center", color: "#6b7280" }}>
          You have no bookings yet.
        </p>
      )}
    </div>
  );
};

export default Bookings;
