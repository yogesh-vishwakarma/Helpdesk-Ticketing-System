const express = require("express");
const adminRouter = express.Router();
const adminMiddleware = require("../middleware/adminmiddleware");

const { createRole,getRoles,updateRole,deleteRole,createUser,getUsers,updateUserRole,deleteUser } = require("../controllers/adminController");

// Protect all Admin routes
adminRouter.use(adminMiddleware);

// ==================== Role Management ====================

adminRouter.post("/roles", createRole);
adminRouter.get("/roles", getRoles);
adminRouter.patch("/roles/:roleId", updateRole);
adminRouter.delete("/roles/:roleId", deleteRole);

// ==================== User Management ====================

// Admin creates a user with any existing role
adminRouter.post("/users", createUser);
adminRouter.get("/users", getUsers);
adminRouter.patch("/users/:userId/role", updateUserRole);
adminRouter.delete("/users/:userId", deleteUser);

module.exports = adminRouter;
