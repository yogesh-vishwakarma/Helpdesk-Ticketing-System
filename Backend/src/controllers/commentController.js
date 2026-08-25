const Comment=require("../models/comment");
const Ticket=require("../models/ticket");
const Activity=require("../models/activity");

const addComment=async (req,res)=>{
 try{
       const {ticketId}=req.params;
       const {message,type,attachment}= req.body;

       if(!message){
        return res.status(400).json({
          message:"Comment message is required"
        })
       }

       const allowTypes=["comment","internal_note"];

       if(!type && !allowTypes.includes(type)){
        return res.status(400).json({
          message:"Invalid Comment type"
        })
       }
     
       const ticketexist=await Ticket.findById(ticketId);
       if(!ticketexist){
        return res.status(404).json({
            message:"Ticket not Found"
        })
       }

      const commentType=type||"comment"
        
        
       if(commentType==="internal_note" && req.result.role.roleName==="Customer"){
          return res.status(404).json({
              message:"Customer can not add internal note."
          })
       }

      const comment=await Comment.create({
        ticket:ticketId,
        author:req.result._id,
        message,
        type,
        attachment
       })

       await Activity.create({
        ticket:ticketId,
        performedBy:req.result._id,
        action:"Comment_Added",
        details:commentType === "internal_note"? "Internal note added to ticket": "Comment added to ticket",
       })

       res.status(201).json({
        message:"Comment added Successfully",
        comment
       })

 }
 catch(err){
  res.status(500).json({
       message:err.message
 })
}
}

const getComments=async(req,res)=>{
   
  try{  
    const {ticketId}=req.params;

    const existTicket=await Ticket.findById(ticketId);
    if(!existTicket){
      return res.status(404).json({
        message:"Ticket not Found"
      })
    }

    const comments=await Comment.find({
        ticket:ticketId
    })

    res.status(200).json({
        comments
    })
   }
   catch(err){
     res.send(404).json({
        message:err.message
     })
   }
}

//const addInternalNote=async(req,res)=>{

// } 

module.exports={addComment,getComments}