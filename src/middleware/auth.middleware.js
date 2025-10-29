import jwt from "jsonwebtoken";
import config from "../config/index.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Missing token" });

  jwt.verify(token, config.jwt.accessSecret, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// role-based guard
export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ success: false, message: "Access denied" });
    next();
  };
}
