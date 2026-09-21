const User = require("../models/user");
const Role = require("../models/role");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("../utils/validator");

const register = async (req, res) => {
  try {
    validate(req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const role=await Role.findOne({
    //   roleName:"Customer"
    // })

    //Customer:"6a91932de9837a0b3bffcacf"

    const role = await Role.findById("6a91932de9837a0b3bffcacf").populate(
      "permissions",
    );

    if (!role) {
      return res.status(500).json({
        message: "Customer role not found",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role._id,
    });

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: role._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "3h",
      },
    );

    const reply = {
      name: user.name,
      email: user.email,
      _id: user._id,
      role: role.roleName,
      permissions: role.permissions.map((permission) => permission.name),
    };

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.status(201).json({
    //   user: reply,
    //   message: "Registered Successfully",
    // });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ email }).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      },
    );

    const reply = {
      name: user.name,
      email: user.email,
      _id: user._id,
      role: user.role.roleName,
      permissions: user.role.permissions.map((p) => p.name),
    };

    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.status(200).json({
    //   user: reply,
    //   message: "Logged in Successfully",
    // });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // res.clearCookie("token");
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { serId } = req.params;

    // Prevent logged-in user from deleting himself
    if (req.result._id.toString() === userId) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = req.result;

    if (!user || user.isDeleted) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const reply = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role?.roleName,
      permissions:
        user.role?.permissions?.map((permission) => permission.name) || [],
    };

    return res.status(200).json({
      user: reply,
      message: "Authenticated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { register, login, logout, deleteUser, getCurrentUser };





// module.exports = { register, login, logout, deleteUser, getCurrentUser };