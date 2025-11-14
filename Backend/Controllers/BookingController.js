import BookingModel from "../Models/BookingModel.js";
import RoomModel from "../Models/addRoomModel.js";
import { client, paypal } from "../Config/paypal.js";

export const createPaypalOrder = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, amount, propertyId } = req.body;
    const { id: userId } = req.user;

    //Check if the frontend provided all details or not
    if (!roomId || !checkIn || !checkOut || !amount || !propertyId)
      return res
        .status(400)
        .json({ message: "Please provide all details", success: false });

    //Check if the room is present or not
    const roomDetails = await RoomModel.findById(roomId);
    if (!roomDetails)
      return res
        .status(400)
        .json({ message: "Room not found", success: false });

    //Get the Total rooms
    const totalRooms = roomDetails.totalRooms;

    //Delete all pending bookings of the user for that particular room
    await BookingModel.deleteMany({
      roomType: roomId,
      user: userId,
      status: "pending",
    });

    //Find the bookings pending , confirmed
    const bookingConflicts = await BookingModel.countDocuments({
      roomType: roomId,
      status: { $in: ["confirmed", "pending"] },
      checkOut: { $gt: checkIn },
      checkIn: { $lt: checkOut },
    });

    //Check that room is available or not
    if (bookingConflicts >= totalRooms)
      return res.status(409).json({
        message: "Room is sold out for selected dates",
        success: false,
      });

    //Create a new Booking
    const newBooking = await BookingModel.create({
      roomType: roomId,
      user: userId,
      propertyId,
      checkIn: checkIn,
      checkOut: checkOut,
      amountPaid: amount,
      status: "pending",
      paymentInfo: {},
    });

    //Create a new Paypal Order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD", // Must be USD for PayPal in India
            value: amount.toString(),
          },
          // This is the CRITICAL link between PayPal and your database
          reference_id: newBooking._id.toString(),
        },
      ],
    });

    const order = await client.execute(request);

    //Save paypal order Id to our booking
    newBooking.paymentInfo.orderId = order.result.id;
    await newBooking.save();

    //Send the paypal order id back to frontend
    return res.status(200).json({
      orderId: order.result.id,
      success: true,
      message: "Order created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Server error", success: false });
  }
};

export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId)
      return res.status(400).json({ message: "Paypal Order Id is missing" });

    // Capture the payment on PayPal's side , this verifies the payment and moves the funds
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await client.execute(request);

    // Get our internal booking ID from the 'reference_id', we get this from the *verified capture object*, not from the client
    const bookingId = capture.result.purchase_units[0].reference_id;

    // Get the PayPal payment ID for our records
    const paymentId = capture.result.id;

    //Now find the booking id the database
    const booking = await BookingModel.findById(bookingId);

    if (!booking) {
      // This should not happen if our flow is correct
      return res
        .status(404)
        .json({ success: false, message: "Booking not found in our database" });
    }

    if (booking.status !== "pending")
      return res.status(400).json({
        message:
          "Booking is not in pending state. It may have already been confirmed or expired.",
        success: false,
      });

    booking.status = "confirmed";
    booking.paymentInfo.paymentId = paymentId;
    await booking.save();

    return res.status(200).json({
      message: "Booking Confirmed",
      success: true,
      bookingId: booking._id,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: "PayPal error",
        error: error.message,
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  const { id: userId } = req.user;

  if (!userId)
    return res
      .status(400)
      .json({ message: "User id not provided", success: false });
  try {
    const bookings = await BookingModel.find({
      user: userId,
    })
      .populate("roomType")
      .populate("propertyId", "name location");

    if (bookings.length == 0)
      return res
        .status(200)
        .json({ message: "No bookings found", success: false });

    return res
      .status(200)
      .json({ message: "Booking found successfully", success: true, bookings });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error });
  }
};

export const getTotalBookings = async (req, res) => {
  try {
    const totalBookings = await BookingModel.countDocuments({
      status: { $in: ["confirmed", "pending"] },
    });

    if (totalBookings === 0)
      return res
        .status(404)
        .json({ message: "No bookings found.", success: false, totalBookings });

    return res.status(200).json({
      message: "Bookings fetched successfully",
      totalBookings,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error: error.message });
  }
};

export const getRecentBooking = async (req, res) => {
  try {
    const recentBookings = await BookingModel.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email")
      .populate("roomType")
      .populate("propertyId", "name location");

    return res.status(200).json({
      message: "Recent bookings fetched successfully",
      success: true,
      recentBookings,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const revenue = await BookingModel.aggregate([
      {
        $match: { status: "confirmed" },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amountPaid" },
        },
      },
    ]);

    return res.status(200).json({
      message: "Total revenue fetched successfully.",
      totalRevenue: revenue[0].totalRevenue,
      success: true,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

export const getAdminBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("roomType")
      .populate("propertyId", "name location");
    return res
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
