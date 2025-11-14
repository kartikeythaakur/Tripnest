import React, { useState } from "react";
import moment from "moment";

const BookingDatePicker = () => {
  const formatDate = (date) => date.toISOString().split("T")[0];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [range, setRange] = useState({
    checkIn: formatDate(today),
    checkOut: formatDate(tomorrow),
  });

  const handleDateSelect = (selectedDate) => {
    const date = new Date(selectedDate);

    // 1️⃣ If no checkIn or both selected → start new range
    if (!range.checkIn || (range.checkIn && range.checkOut)) {
      setRange({ checkIn: formatDate(date), checkOut: "" });
    }
    // 2️⃣ If selecting checkout and it's after checkin
    else if (date > new Date(range.checkIn)) {
      setRange({ ...range, checkOut: formatDate(date) });
    }
    // 3️⃣ If selecting before checkIn → reset
    else {
      setRange({ checkIn: formatDate(date), checkOut: "" });
    }
  };

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     gap:"10px",
    //     alignItems: "center",
    //     justifyContent:"center",
    //     borderRadius: "12px",
    //     // background: "#f8fafc",
    //     maxWidth: "400px",
    //     margin: "auto",
    //     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    //   }}
    // >

     <>

      <input
        type="date"
        min={formatDate(today)} // disables past dates
        value={range.checkIn}
        onChange={(e) => handleDateSelect(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          // marginBottom: "12px",
          width: "100%",
        }}
      />

      <input
        type="date"
        min={range.checkIn} // disables checkout before check-in
        value={range.checkOut}
        onChange={(e) => handleDateSelect(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
      </>
    // </div>
  );
};

export default BookingDatePicker;
