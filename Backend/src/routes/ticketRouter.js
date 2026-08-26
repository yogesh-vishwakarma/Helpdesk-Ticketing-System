const express = require("express");
const ticketRouter = express.Router();
const userMiddleware = require("../middleware/usermiddleware");
const checkPermission=require("../middleware/permissionmiddleware")

const {createTicket,getTickets,getTicket,updateTicket,assignTicket,getActivity,updateTicketPriority,updateTicketStatus} = require("../controllers/ticketController");

ticketRouter.use(userMiddleware);


ticketRouter.post("/",checkPermission("TICKET_CREATE"),createTicket);
ticketRouter.get("/",checkPermission("TICKET_VIEW_ALL"),getTickets);
ticketRouter.get("/:ticketId",checkPermission("TICKET_VIEW_OWN"),getTicket);
ticketRouter.patch("/:ticketId",checkPermission("TICKET_UPDATE"),updateTicket);
ticketRouter.patch("/:ticketId/status",checkPermission("TICKET_UPDATE_STATUS"),updateTicketStatus);
ticketRouter.patch("/:ticketId/priority",checkPermission("TICKET_UPDATE_PRIORITY"),updateTicketPriority);
ticketRouter.post("/:ticketId/assign",checkPermission("TICKET_ASSIGN"),assignTicket);
ticketRouter.get("/:ticketId/activities",checkPermission("ACTIVITY_VIEW"),getActivity);


module.exports = ticketRouter;