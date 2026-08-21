const express = require("express");
const ticketRouter = express.Router();
const userMiddleware = require("../middleware/usermiddleware");

const {createTicket,getTickets,getTicket,updateTicket,assignTicket} = require("../controllers/ticketController");


// All ticket APIs require authentication
ticketRouter.use(userMiddleware);


ticketRouter.post("/", createTicket);
ticketRouter.get("/", getTickets);
ticketRouter.get("/:ticketId", getTicket);
ticketRouter.patch("/:ticketId", updateTicket);
ticketRouter.patch("/:ticketId/assign", assignTicket);


module.exports = ticketRouter;