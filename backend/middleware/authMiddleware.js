import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};