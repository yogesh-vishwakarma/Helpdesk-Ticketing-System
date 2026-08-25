const express=require("express");
const userMiddleware = require("../middleware/usermiddleware");
const commentRouter=express.Router();
const {addComment,getComments}=require("../controllers/commentController");



commentRouter.use(userMiddleware);

commentRouter.post("/:ticketId",addComment);
commentRouter.get("/:ticketId",getComments);
// commentRouter.post("/:ticketId/internal",createInternalNote);

module.exports=commentRouter;