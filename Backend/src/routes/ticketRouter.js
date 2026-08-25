const express = require("express");
const ticketRouter = express.Router();
const userMiddleware = require("../middleware/usermiddleware");

const {createTicket,getTickets,getTicket,updateTicket,assignTicket,getActivity} = require("../controllers/ticketController");


// All ticket APIs require authentication
ticketRouter.use(userMiddleware);


ticketRouter.post("/", createTicket);
ticketRouter.get("/", getTickets);
ticketRouter.get("/:ticketId", getTicket);
ticketRouter.patch("/:ticketId", updateTicket);
ticketRouter.post("/:ticketId/assign", assignTicket);
ticketRouter.post("/:ticketId/activities",getActivity);


module.exports = ticketRouter;