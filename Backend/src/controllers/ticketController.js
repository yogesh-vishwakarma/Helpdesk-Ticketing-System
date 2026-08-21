const Ticket = require("../models/ticket");

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
    const tickets = await Ticket.find()
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


const getTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
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


const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const { title, description, priority, status, category } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

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


const assignTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { assignedAgent } = req.body;

    if (!assignedAgent) {
      return res.status(400).json({
        message: "Agent ID is required",
      });
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.assignedAgent = assignedAgent;
    ticket.status = "In Progress";

    await ticket.save();

    return res.status(200).json({
      message: "Ticket assigned successfully",
      ticket,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {createTicket,getTickets,getTicket,updateTicket,assignTicket};