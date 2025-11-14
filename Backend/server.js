import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./Config/connection.js";
import adminRoutes from "./Routes/adminRoute.js";
import userRoutes from "./Routes/userRoute.js";
import propertyRoutes from "./Routes/addPropertyRoute.js";
import bookingRoutes from "./Routes/bookingRoute.js";
import { startBookingCleanupJob } from "./Helper/bookingCleanUp.js";

const MONGO_URL = process.env.MONGO_DB_URL;

connectDb(MONGO_URL);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/booking", bookingRoutes);
// {
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// app.listen(process.env.PORT, "0.0.0.0", () => {
//   console.log(`App is running on ${process.env.PORT}`);
//   //Start clean up job
//   startBookingCleanupJob();
// });

app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
  //Start clean up job
  startBookingCleanupJob();
});
