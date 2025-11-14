import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PayPalBookingButton = ({
  room,
  booking,
  totalNights,
  token,
  handleClose,
  setBooking,
  propertyId,
}) => {
  const [error, setError] = useState(null);
  // Calculate amount here, knowing totalNights is valid
  const amount = (totalNights * room.price).toFixed(2); // Use .toFixed(2) for currency

  // 1. CREATE ORDER
  const handleCreateOrder = async (data, actions) => {
    setError(null);
    try {
      const payload = {
        roomId: room._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        amount: amount,
        propertyId,
      };

      console.log(payload);
      if (booking.guests > room.capacity)
        return toast.error(`Only ${room.capacity} guest allowed in a room`);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/booking/create-paypal-order`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.orderId;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Could not initiate booking";
      setError(errorMessage);
      toast.error(err.response?.data?.message);
      throw new Error(errorMessage);
    }
  };

  // 2. ON APPROVE
  const handleOnApprove = async (data, actions) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/booking/capture-paypal-order`,
        { orderId: data.orderID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log("Booking Confirmed!", response.data.bookingId);
        toast.success("Booking Confirmed!");
        setBooking({
          checkIn: "",
          checkOut: "",
          guests: 1,
        });
        handleClose();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Payment failed during capture.";
      setError(errorMessage);
    }
  };

  // 3. ON ERROR
  const handleOnError = (err) => {
    console.error("PayPal Checkout onError", err);
    setError("An unexpected error occurred with PayPal. Please try again.");
    toast.error(error);
  };

  // 4. ON CANCEL
  const handleOnCancel = (data) => {
    console.log("User cancelled the payment", data);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}
      <PayPalButtons
        style={{
          layout: "vertical",
          shape: "rect",
          color: "gold",
          label: "pay",
        }}
        disabled={false}
        createOrder={handleCreateOrder}
        onApprove={handleOnApprove}
        onError={handleOnError}
        onCancel={handleOnCancel}
      />
    </div>
  );
};

export default PayPalBookingButton;
