const express = require("express");
const ticketRouter = express.Router();
const userMiddleware = require("../middleware/usermiddleware");
const {checkPermission,checkAnyPermission}=require("../middleware/permissionmiddleware")

const {createTicket,getAllTickets,getTicket,updateTicket,assignTicket,getActivity,updateTicketPriority,updateTicketStatus} = require("../controllers/ticketController");

ticketRouter.use(userMiddleware);


ticketRouter.post("/",checkPermission("TICKET_CREATE"),createTicket);
ticketRouter.get("/",checkAnyPermission(["TICKET_VIEW_OWN","TICKET_VIEW_ALL","TICKET_VIEW_ASSIGNED"]),getAllTickets);
ticketRouter.get("/:ticketId",checkAnyPermission(["TICKET_VIEW_ALL","TICKET_VIEW_ASSIGNED","TICKET_VIEW_OWN"]),getTicket);
ticketRouter.patch("/:ticketId",checkPermission("TICKET_UPDATE"),updateTicket);
ticketRouter.patch("/:ticketId/status",checkPermission("TICKET_UPDATE_STATUS"),updateTicketStatus);
ticketRouter.patch("/:ticketId/priority",checkPermission("TICKET_UPDATE_PRIORITY"),updateTicketPriority);
ticketRouter.post("/:ticketId/assign",checkPermission("TICKET_ASSIGN"),assignTicket);
ticketRouter.get("/:ticketId/activities",checkPermission("ACTIVITY_VIEW"),getActivity);

module.exports = ticketRouter;