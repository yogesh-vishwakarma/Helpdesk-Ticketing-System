const express = require("express");

const roleRouter = express.Router();

const adminMiddleware = require("../middleware/adminmiddleware");
const { createRole } = require("../controllers/roleController");

roleRouter.post("/", adminMiddleware, createRole);

module.exports = roleRouter;