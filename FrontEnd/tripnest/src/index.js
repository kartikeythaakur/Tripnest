import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/Global.css'

const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, // Get from .env file
    currency: "USD", // MUST be USD for sandbox testing from India
    intent: "capture",
  };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <App />
      <ToastContainer />
    </PayPalScriptProvider>  
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
