const express=require("express");
const dashboardRouter=express.Router();
const userMiddleware=require("../middleware/usermiddleware")
const {checkPermission,checkAnyPermission} = require("../middleware/permissionmiddleware");
const {getDashboardSummary,getTicketsByStatus,getTicketsByPriority,getTicketsByCategory,getTicketRecent,getUnassignedTickets,getAgents}=require("../controllers/dashboardController")

dashboardRouter.use(userMiddleware);
dashboardRouter.use(checkPermission("DASHBOARD_VIEW"))


dashboardRouter.get("/",getDashboardSummary);
dashboardRouter.get("/tickets/status",getTicketsByStatus);
dashboardRouter.get("/tickets/priority",getTicketsByPriority);
dashboardRouter.get("/tickets/category",getTicketsByCategory);
dashboardRouter.get("/tickets/recent",getTicketRecent);
dashboardRouter.get("/tickets/unassigned",getUnassignedTickets);
dashboardRouter.get("/agents",getAgents);

module.exports=dashboardRouter;