const express = require("express");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/userAuthent");
const userMiddleware = require("../middleware/usermiddleware");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", userMiddleware, getCurrentUser);
authRouter.post("/logout", userMiddleware, logout);

module.exports = authRouter;
