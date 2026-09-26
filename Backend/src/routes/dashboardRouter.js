const express=require("express");
const dashboardRouter=express.Router();
const userMiddleware=require("../middleware/usermiddleware")
const {checkPermission,checkAnyPermission} = require("../middleware/permissionmiddleware");
const {getDashboardSummary,getTicketsByStatus,getTicketsByPriority,getTicketsByCategory,getTicketRecent,getUnassignedTickets,getAgents}=require("../controllers/dashboardController")

dashboardRouter.use(userMiddleware);


dashboardRouter.get("/",checkPermission("DASHBOARD_VIEW"),getDashboardSummary);
dashboardRouter.get("/tickets/status",checkPermission("DASHBOARD_VIEW"),getTicketsByStatus);
dashboardRouter.get("/tickets/priority",checkPermission("DASHBOARD_VIEW"),getTicketsByPriority);
dashboardRouter.get("/tickets/category",checkPermission("DASHBOARD_VIEW"),getTicketsByCategory);
dashboardRouter.get("/tickets/recent",checkPermission("DASHBOARD_VIEW"),getTicketRecent);
dashboardRouter.get("/tickets/unassigned",checkPermission("DASHBOARD_VIEW"),getUnassignedTickets);
dashboardRouter.get("/agents",checkPermission("AGENT_VIEW"),getAgents);

module.exports=dashboardRouter;