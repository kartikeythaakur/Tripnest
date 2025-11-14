import cron from "node-cron";
import BookingModel from "../Models/BookingModel.js";

export const startBookingCleanupJob = () => {
  cron.schedule("*/15 * * * *", async () => {
    try {
      const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

      const result = await BookingModel.deleteMany({
        status: "pending",
        createdAt: { $lt: fifteenMinsAgo },
      });

      if (result.deletedCount > 0) {
        console.log(`Deleted ${result.deletedCount} expired pending bookings`);
      }
    } catch (error) {
      console.log("Clean up cron job error", error.message);
    }
  });

  console.log("Booking clean cron job started");
};
