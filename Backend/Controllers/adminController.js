import adminmodel from '../Models/adminModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

export const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });

    const existing = await adminmodel.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists." });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await adminmodel.create({ name, email, password: hashed });
    console.log(admin);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      admin: { id: admin._id, name: admin.name, email: admin.email }, // Send back non-sensitive data
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please fill all fields", success: false });

    const admin = await adminmodel.findOne({ email });
    if (!admin)
      return res
        .status(404)
        .json({ message: "Admin not found", success: false});

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    
    const token = jwt.sign(
      {id:admin._id , role:admin.role, email:admin.email, name:admin.name},
      process.env.JWT_SECRET_KEY,
      {expiresIn:"1d"}
    )
    
    return res.status(200).json({ message: "Login successful", token });
    
  } catch (error) {
    
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};
