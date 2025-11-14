import jwt from "jsonwebtoken";

export const verifyAdmin = async(req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Unauthorized", success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (decoded.role != "superadmin")
     return  res.status(403).json({ messgae: "Not authorized", success: false });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token expired, login again." });
  }
};
