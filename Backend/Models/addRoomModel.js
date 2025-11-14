import mongoose from "mongoose";

const addRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Room type is required"] },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    totalRooms: { type: Number, required: true, default: 1 },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("RoomSchema", addRoomSchema);
