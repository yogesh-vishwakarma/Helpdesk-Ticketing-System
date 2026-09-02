const express = require("express");
const managementRouter = express.Router();
const  userMiddleware=require("../middleware/usermiddleware");
const {checkPermission,checkAnyPermission}=require("../middleware/permissionmiddleware");

const { createRole,getRoles,updateRole,deleteRole,createUser,getUsers,updateUserRole,deleteUser,createPermission,getPermissions,updatePermission,deletePermission} = require("../controllers/managementController");

managementRouter.use(userMiddleware);

// ================ Permission Management ==================
managementRouter.post("/permission",checkPermission("PERMISSION_CREATE"),createPermission);
managementRouter.get("/permissions",checkPermission("PERMISSION_VIEW"),getPermissions);
managementRouter.patch("/permission/:id",checkPermission("PERMISSION_UPDATE"),updatePermission);
managementRouter.delete("/permission/:id",checkPermission("PERMISSION_DELETE"),deletePermission);

// ==================== Role Management ====================
managementRouter.post("/roles",checkPermission("ROLE_CREATE"),createRole);
managementRouter.get("/roles",checkPermission("ROLE_VIEW"),getRoles);
managementRouter.patch("/roles/:roleId",checkPermission("ROLE_UPDATE"),updateRole);
managementRouter.delete("/roles/:roleId",checkPermission("ROLE_DELETE"),deleteRole);

// ==================== User Management ====================

// Admin creates a user with any existing role
managementRouter.post("/user",checkPermission("USER_CREATE"),createUser);
managementRouter.get("/users",checkPermission("USER_VIEW"),getUsers);
managementRouter.patch("/users/:userId/role",checkPermission("USER_UPDATE"),updateUserRole);
managementRouter.delete("/users/:userId",checkPermission("USER_DELETE"),deleteUser);

module.exports = managementRouter;
