import axios from "axios";
import React, { useMemo, useState } from "react";
import { Modal, Form } from "react-bootstrap"; // Button is not used
import { toast } from "react-toastify";
import PayPalBookingButton from "../Components/PayPalBookingButton";

// --- FIX 1: Use the robust calculateNights function ---
const calculateNights = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return 0;

  const date1 = new Date(checkInDate);
  const date2 = new Date(checkOutDate);
  const msPerDay = 1000 * 60 * 60 * 24;

  // Use UTC to avoid timezone/DST errors
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const differenceInDays = Math.round((utc2 - utc1) / msPerDay);

  return differenceInDays > 0 ? differenceInDays : 0;
};

const BookRoomModal = ({ room, show, handleClose , propertyId }) => {
  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const token = localStorage.getItem("token");

  const totalNights = useMemo(() => {
    return calculateNights(booking.checkIn, booking.checkOut);
  }, [booking.checkIn, booking.checkOut]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#1e3a8a" }}>
            Book {room.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px" }}>
          {/* Room Info */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ margin: "0" }}>
              <strong>Room Type: </strong> {room.name}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Capacity: </strong> {room.capacity} persons
            </p>

            {totalNights > 0 && (
              <p style={{ margin: "0", marginTop: "5px", fontWeight: "bold" }}>
              
                <strong>Total Price: </strong> $ {(room.price * totalNights).toFixed(2)}{" "}
                ({totalNights} nights)
              </p>
            )}
          </div>

          <Form>
            {/* Check-in Date */}
            <Form.Group className="mb-3" controlId="checkIn">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                type="date"
                name="checkIn"
                value={booking.checkIn}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </Form.Group>

            {/* Check-out Date */}
            <Form.Group className="mb-3" controlId="checkOut">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOut"
                value={booking.checkOut}
                onChange={handleChange}
                required
                // --- THIS IS THE BUG FIX ---
                // Checkout min date must be 1 day after check-in
                min={
                  booking.checkIn
                    ? new Date(
                        new Date(booking.checkIn).getTime() + 86400000
                      )
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
              />
            </Form.Group>

            {/* Guests */}
            <Form.Group className="mb-3" controlId="guests">
              <Form.Label>Guests</Form.Label>
              <Form.Control
                type="number"
                name="guests"
                placeholder="e.g. 2"
                value={booking.guests}
                onChange={handleChange}
                required
                min={1}
                max={room.capacity}
              />
            </Form.Group>

          
            {totalNights > 0 ? (
              <PayPalBookingButton
                booking={booking}
                room={room}
                totalNights={totalNights}
                token={token}
                handleClose = {handleClose}
                setBooking={setBooking}
                propertyId = {propertyId}
              />
            ) : (
              <p style={{ textAlign: "center", color: "#555", marginTop: "20px" }}>
                Please select valid check-in and check-out dates to pay.
              </p>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  ); 
};

export default BookRoomModal;
