const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);

    if (!payload._id) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const user = await User.findById(payload._id).populate("role");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (!user.role) {
      return res.status(403).json({
        message: "User role not found",
      });
    }

    if (user.role.roleName !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can create roles",
      });
    }

    req.result = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = adminMiddleware;