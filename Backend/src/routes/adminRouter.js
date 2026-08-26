const express = require("express");
const adminRouter = express.Router();
const adminMiddleware = require("../middleware/adminmiddleware");
const checkPermission=require("../middleware/permissionmiddleware");

const { createRole,getRoles,updateRole,deleteRole,createUser,getUsers,updateUserRole,deleteUser,createPermission,getPermissions,updatePermission,deletePermission} = require("../controllers/adminController");

adminRouter.use(adminMiddleware);

// ================ Permission Management ==================
adminRouter.post("/permission",checkPermission("PERMISSION_CREATE"),createPermission);
adminRouter.get("/permissions",checkPermission("PERMISSION_VIEW"),getPermissions);
adminRouter.patch("/permission/:id",checkPermission("PERMISSION_UPDATE"),updatePermission);
adminRouter.delete("/permission/:id",checkPermission("PERMISSION_DELETE"),deletePermission);

// ==================== Role Management ====================
adminRouter.post("/roles",checkPermission("ROLE_CREATE"),createRole);
adminRouter.get("/roles",checkPermission("ROLE_VIEW"),getRoles);
adminRouter.patch("/roles/:roleId",checkPermission("ROLE_UPDATE"),updateRole);
adminRouter.delete("/roles/:roleId",checkPermission("ROLE_DELETE"),deleteRole);

// ==================== User Management ====================

// Admin creates a user with any existing role
adminRouter.post("/user",checkPermission("USER_CREATE"),createUser);
adminRouter.get("/users",checkPermission("USER_VIEW"),getUsers);
adminRouter.patch("/users/:userId/role",checkPermission("USER_UPDATE"),updateUserRole);
adminRouter.delete("/users/:userId",checkPermission("USER_DELETE"),deleteUser);

module.exports = adminRouter;
