const Comment=require("../models/comment");
const Ticket=require("../models/ticket");
const Activity=require("../models/activity");

const addComment=async (req,res)=>{
 try{
       const {ticketId}=req.params;
       const {message,type,attachment}= req.body;

       if(!message?.trim()){
        return res.status(400).json({
          message:"Comment message is required"
        })
       }

       const ticketexist=await Ticket.findById(ticketId);

       if(!ticketexist){
        return res.status(404).json({
            message:"Ticket not Found"
        })
       }

       const permissions=req.result.role.permissions.map((p) => p.name);
       
       const isOwner=ticketexist.customer.toString()===req.result._id.toString();
       const isAssigned =ticketexist.assignedAgent&&ticketexist.assignedAgent.toString() === req.result._id.toString();

    const allowed=permissions.includes("TICKET_VIEW_ALL") ||(permissions.includes("TICKET_VIEW_ASSIGNED") && isAssigned)|| (permissions.includes("TICKET_VIEW_OWN") && isOwner);
  
     if (!allowed) {
       return res.status(403).json({
          message: "You are not allowed to comment on this ticket",
       });
      }

      const comment=await Comment.create({
        ticket:ticketId,
        author:req.result._id,
        message,
        type:"comment",
        attachment
       })

       await Activity.create({
        ticket:ticketId,
        performedBy:req.result._id,
        action:"Comment_Added",
        details:"Comment added to ticket", 
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

    const permissions=req.result.role.permissions.map((p)=>p.name);

    const isOwner=existTicket.customer._id.toString()===req.result._id.toString();
    const isAssigned=existTicket.assignedAgent && existTicket.assignedAgent._id.toString()===req.result._id.toString();

    const allowed=permissions.includes("TICKET_VIEW_ALL") || (permissions.includes("TICKET_VIEW_ASSIGNED") && isAssigned) || (permissions.includes("TICKET_VIEW_OWN") && isOwner);
   
    if(!allowed) {
      return res.status(403).json({
        message: "You are not allowed to view comments of this ticket",
      });
    }

    let query={ticket:ticketId,type:"comment"};

    const comments=await Comment.find(query)
    .populate("author", "name email")
    .sort({ createdAt: -1 });

    res.status(200).json({
        comments
    })
   }
   catch(err){
     res.status(404).json({
        message:err.message
     })
   }
}

const addInternalNote=async (req,res)=>{
  try {
    const {ticketId} = req.params;
    const {message, attachment} = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Internal note message is required",
      });
    }

    const ticket=await Ticket.findById(ticketId);

    if(!ticket){
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const permissions = req.result.role.permissions.map((p) => p.name);

    const isAssigned=ticket.assignedAgent?.toString() === req.result._id.toString();

    const allowed=permissions.includes("TICKET_VIEW_ALL") || (permissions.includes("TICKET_VIEW_ASSIGNED") && isAssigned);

    if (!allowed) {
      return res.status(403).json({
        message: "You are not allowed to add an internal note to this ticket",
      });
    }

    const note = await Comment.create({
      ticket: ticketId,
      author: req.result._id,
      message: message.trim(),
      type: "internal_note",
      attachment,
    });

    await Activity.create({
      ticket: ticketId,
      performedBy: req.result._id,
      action: "Internal_Note_Added",
      details: "Internal note added to ticket",
    });

    return res.status(201).json({
      message: "Internal note added successfully",
      note,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}; 

const getInternalNotes =async(req,res)=>{
  try {
    const {ticketId}=req.params;

    const ticket=await Ticket.findById(ticketId);

    if (!ticket){
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const notes=await Comment.find({
      ticket: ticketId,
      type:"internal_note",
    })
    .populate("author", "name email")
    .sort({createdAt: -1});

    return res.status(200).json({
      message: "Internal notes fetched successfully",
      notes,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports={addComment,getComments,addInternalNote,getInternalNotes}