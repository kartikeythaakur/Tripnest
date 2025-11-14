import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  console.log("req at user");

  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });

    const existing = await userModel.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });

    const hashed = await bcrypt.hash(password, 10);

    const user = await userModel.create({ name, email, password: hashed });
    console.log(user);

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({ message: "Login successfull", token, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      totalUsers,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Server Error", success: false, error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id)
      return res
        .status(400)
        .json({ message: "No user id provided", success: false });

    const details = await userModel.findById(id);
    if (!details)
      return res
        .status(404)
        .json({ message: "user not found", success: false });

    return res
      .status(200)
      .json({ message: "User found", success: true, userDetails: details });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "server error", success: false });
  }
};
