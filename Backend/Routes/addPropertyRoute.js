import express from "express";
const router = express.Router();
import { verifyAdmin } from "../Middlewares/verifyAdmin.js";
import {
  addProperty,
  getPropertyCount,
  getProperty,
  getLocations
} from "../Controllers/addPropertyController.js";
import { getAllProperties } from "../Controllers/PropertyContoller.js";
import { addRoom } from "../Controllers/addRoomController.js";
import { upload } from "../Middlewares/multer.js";
import { uploadMultipleToCloudinary } from "../Helper/cloudinaryUpload.js";

router.post(
  "/addproperty",
  verifyAdmin,
  upload.array("photos", 10),
  uploadMultipleToCloudinary,
  addProperty
);

router.get("/getallproperties", getAllProperties);

router.post(
  "/addroom",
  verifyAdmin,
  upload.array("photos", 10),
  uploadMultipleToCloudinary,
  addRoom
);

router.get("/getproperty/:id", getProperty);
router.get("/get-total-properties", verifyAdmin, getPropertyCount);
router.get('/get-locations',getLocations);

export default router;
