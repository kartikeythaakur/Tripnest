import mongoose from "mongoose";
import RoomSchema from "./addRoomModel.js";

const addpropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: String, required: [true, "State is required"] },
    district: { type: String, required: [true, "District is required"] },
    images: [{ type: String }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "RoomSchema" }],
  },
  { timestamps: true }
);

export default mongoose.model("Propertyschema", addpropertySchema);
