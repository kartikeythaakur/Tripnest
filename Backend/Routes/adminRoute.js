import express from 'express';
const router = express.Router();
import { signupAdmin,loginAdmin } from "../Controllers/adminController.js";
  
router.post('/signup', signupAdmin);
router.post('/login',loginAdmin);

export default router;