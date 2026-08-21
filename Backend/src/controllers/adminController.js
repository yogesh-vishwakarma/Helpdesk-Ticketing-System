const bcrypt = require("bcrypt");
const Role = require("../models/role");
const User = require("../models/user");

// =====================================================
// ROLE MANAGEMENT
// =====================================================

const createRole = async (req, res) => {
  try {
    const { roleName, description, permissions } = req.body;

    if (!roleName) {
      return res.status(400).json({
        message: "Role name is required",
      });
    }

    const existingRole = await Role.findOne({
      roleName: roleName.trim(),
    });

    if (existingRole) {
      return res.status(409).json({
        message: "Role already exists",
      });
    }

    const role = await Role.create({
      roleName: roleName.trim(),
      description,
      permissions: permissions || [],
    });

    return res.status(201).json({
      message: "Role created successfully",
      role,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// Get All Roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });

    return res.status(200).json({
      roles,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// Update Role
const updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { roleName, description, permissions } = req.body;

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    if (roleName) {
      const existingRole = await Role.findOne({
        roleName: roleName.trim(),
        _id: { $ne: roleId },
      });

      if (existingRole) {
        return res.status(409).json({
          message: "Role name already exists",
        });
      }

      role.roleName = roleName.trim();
    }

    if (description !== undefined) {
      role.description = description;
    }

    if (permissions !== undefined) {
      role.permissions = permissions;
    }

    await role.save();

    return res.status(200).json({
      message: "Role updated successfully",
      role,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// Delete Role
const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    // Check whether any user is using this role
    const usersUsingRole = await User.countDocuments({
      role: roleId,
    });

    if (usersUsingRole > 0) {
      return res.status(400).json({
        message: "Cannot delete role because users are assigned to it",
      });
    }

    await Role.findByIdAndDelete(roleId);

    return res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// =====================================================
// USER MANAGEMENT
// =====================================================

// Admin Creates User
const createUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password || !roleId) {
      return res.status(400).json({
        message: "Name, email, password and roleId are required",
      });
    }

    // Check whether role exists
    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role._id,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.roleName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// Change User Role
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({
        message: "roleId is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    user.role = role._id;

    await user.save();

    return res.status(200).json({
      message: "User role updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.roleName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent Admin from deleting himself
    if (req.result._id.toString() === userId) {
      return res.status(400).json({
        message: "Admin cannot delete their own account",
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


module.exports = {createRole,getRoles,updateRole,deleteRole,createUser,getUsers,updateUserRole,deleteUser};



