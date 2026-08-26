const express=require("express");
const userMiddleware = require("../middleware/usermiddleware");
const commentRouter=express.Router();
const {addComment,getComments}=require("../controllers/commentController");
const checkPermission=require("../middleware/permissionmiddleware");



commentRouter.use(userMiddleware);

commentRouter.post("/:ticketId",checkPermission("COMMENT_CREATE"),addComment);
commentRouter.get("/:ticketId",checkPermission("COMMENT_VIEW"),getComments);
// commentRouter.post("/:ticketId/internal",createInternalNote);

module.exports=commentRouter;