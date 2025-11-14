import express from "express";
const router = express.Router();
import {
  signupUser,
  loginUser,
  getTotalUsers,
  getUserDetails,
} from "../Controllers/userController.js";
import { verifyAdmin } from "../Middlewares/verifyAdmin.js";
import { verifyUser } from "../Middlewares/verifyUser.js";

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/get-total-users", verifyAdmin, getTotalUsers);
router.get("/user-details", verifyUser, getUserDetails);

export default router;
