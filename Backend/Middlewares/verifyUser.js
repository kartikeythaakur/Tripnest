import express from "express";
import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "Unauthorized", success: false });

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(decoded.role !='user') return res.status(403).json({message:"Not authorized",success:false});

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({message:"Token expired , login again",success:false});
  }
};
