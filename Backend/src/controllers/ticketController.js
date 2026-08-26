const User=require("../models/user");
const Ticket = require("../models/ticket");
const Activity=require("../models/activity");


const createTicket = async (req, res) => {
  try {
    const { title, description, priority, category, attachments } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority: priority || "Medium",
      customer: req.result._id,
      attachments: attachments || [],
    });


    const active=await Activity.create({
      ticket:ticket._id,
      performedBy:req.result._id,
      action:"Ticket_Created",
      details:"Ticket created"
    })

   return res.status(201).json({
      message: "Ticket created successfully",
      ticket,
   });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTickets = async (req, res) => {
  try {
    let query={}; 

    if(req.result.role.roleName==="Customer"){
      query.customer=req.result._id;
    }


    const tickets = await Ticket.find(query)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      tickets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTicket =async (req,res)=>{
  try{
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if(req.result.role.roleName==="Customer" && ticket.customer._id.toString() !== req.result._id.toString()){
      return res.status(404).json({
        message:"You are not allowed to view this ticket"
      })
    }

    return res.status(200).json({
      ticket,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


const updateTicket=async (req,res) =>{
  try {
    const { ticketId } = req.params;
    const { title, description, priority, status, category } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

   if(req.result.role.roleName==="Customer"){
      return res.status(403).json({
        message:"Customers can not update tickets"
      })
    }

    const oldStatus=ticket.status;
    const oldPriority=ticket.priority;

    if (title !== undefined) {
      ticket.title = title;
    }

    if (description !== undefined) {
      ticket.description = description;
    }

    if (priority !== undefined) {
      ticket.priority = priority;
    }

    if (status !== undefined) {
      ticket.status = status;
    }

    if (category !== undefined) {
      ticket.category = category;
    }

    await ticket.save();

    if(status!==undefined && oldStatus!==status){
      await Activity.create({
        ticket:ticket._id,
        performedBy:req.result._id,
        action:status === "Resolved"?"Ticket_Resolved": status === "Closed"? "Ticket_Closed":"Status_Changed",
        details:`Status changed from ${oldStatus} to ${status}`
      })
    }

    if(priority!==undefined && oldPriority !==priority){
      await Activity.create({
        ticket:ticketId,
        perfomedBy:req.result._id,
        action:'Priority_Changed',
        details:`Priority changed from ${oldPriority} to ${priority}`,
      })
    }

    return res.status(200).json({
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateTicketStatus=async (req,res)=>{
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const oldStatus = ticket.status;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    if (oldStatus === status) {
      return res.status(400).json({
        message: "Ticket already has this status",
      });
    }

    ticket.status = status;

    await ticket.save();

    await Activity.create({
      ticket: ticket._id,
      performedBy: req.result._id,
      action:status === "Resolved"? "Ticket_Resolved" : status === "Closed" ? "Ticket_Closed" : "Status_Changed", details: `Status changed from ${oldStatus} to ${status}`,
    });

    return res.status(200).json({
      message: "Ticket status updated successfully",
      ticket,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateTicketPriority=async (req, res) =>{
  try {
    const { ticketId } = req.params;
    const { priority } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const oldPriority = ticket.priority;

    if (!priority) {
      return res.status(400).json({
        message: "Priority is required",
      });
    }

    if (oldPriority === priority) {
      return res.status(400).json({
        message: "Ticket already has this priority",
      });
    }

    ticket.priority = priority;

    await ticket.save();

    await Activity.create({
      ticket: ticket._id,
      performedBy: req.result._id,
      action: "Priority_Changed",
      details: `Priority changed from ${oldPriority} to ${priority}`,
    });

    return res.status(200).json({
      message: "Ticket priority updated successfully",
      ticket,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const assignTicket = async (req, res) => {
  try {
    const {ticketId} = req.params;
    const {assignedAgent} = req.body;

    const Agent=await User.findById(assignedAgent).populate('role');
    
    if(Agent.role.roleName==="Customer"){
      return res.status(404).json({
        message:"Customers are not allowed to assign tickets."
      })
    }

    if(!Agent){
      return res.status(400).json({
        message: "Agent not found",
      });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.assignedAgent = Agent._id;
    ticket.status = "In Progress";

    await ticket.save();

    await Activity.create({
        ticket:ticket._id,
        performedBy:req.result._id,
        action:"Ticket_Assigned",
        details:`Ticket is assigned to ${Agent.name}`
    }) 

    return res.status(200).json({
      message: "Ticket assigned successfully"
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getActivity= async (req,res)=>{
  
  try{
  const {ticketId}=req.params;
  const existTicket=await Ticket.findById(ticketId);
  if(!existTicket){
   return res.status(404).json({
    message:"Ticket not Found"
   })
  }

  if(req.result.role.roleName==="Customer" && ticket.customer._id.toString()!==req.result._id.toString())
  {
   return res.status(403).json({
    message:"You are not allowed to view activities of this ticket"
   })
  }

   const activities=await Activity.find({
    ticket:ticketId
   }).populate("performedBy","name email").sort({createdAt:-1})

 
  return res.status(200).json({
    message:"Activites fetched successfully",
    activities
  })

}
catch(err){
  return res.status(500).json({
    message:err.message
  })
}
}

module.exports = {createTicket,getTickets,getTicket,updateTicket,assignTicket,getActivity,updateTicketPriority,updateTicketStatus};