import express from "express";
const router = express.Router();
import {
  createPaypalOrder,
  capturePaypalOrder,
  getUserBookings,
  getTotalBookings,
  getRecentBooking,
  getTotalRevenue,
  getAdminBookings
} from "../Controllers/BookingController.js";
import { verifyUser } from "../Middlewares/verifyUser.js";
import { verifyAdmin } from "../Middlewares/verifyAdmin.js";

router.post("/create-paypal-order", verifyUser, createPaypalOrder);
router.post("/capture-paypal-order", verifyUser, capturePaypalOrder);
router.get("/getbookings", verifyUser, getUserBookings);
router.get("/get-total-bookings", verifyAdmin, getTotalBookings);
router.get("/get-recent-bookings", verifyAdmin, getRecentBooking);
router.get("/get-total-revenue", verifyAdmin, getTotalRevenue);
router.get("/admin/get-bookings",verifyAdmin,getAdminBookings)

export default router;
