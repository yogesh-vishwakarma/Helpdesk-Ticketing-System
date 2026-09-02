const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userMiddleware = async (req, res, next) => {
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

    const user= await User.findById(payload._id).populate({
      path:'role',
      populate:{
        path:'permissions'
      }
    });
    
    if (!user) {
      return res.status(401).json({
        message: "User not found",
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

module.exports = userMiddleware;