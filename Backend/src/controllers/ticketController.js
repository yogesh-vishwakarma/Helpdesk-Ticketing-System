const User = require("../models/user");
const Ticket = require("../models/ticket");
const Activity = require("../models/activity");
const generateTicketId = require("../utils/generateTicketId");
const { validateCreateTicket } = require("../utils/validator");
const cloudinary = require("../config/cloudinary");
const Attachment = require("../models/attachement");

const createTicket = async (req, res) => {
  try {
    const { isValid, errors } = validateCreateTicket(req.body);
    const { title, description, priority, category, attachments } = req.body;

    if (!isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    const ticketId = await generateTicketId();

    const ticket = await Ticket.create({
      ticketId,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      priority: priority || "Medium",
      customer: req.result._id,
      attachments: attachments || [],
    });

    const active = await Activity.create({
      ticket: ticket._id,
      performedBy: req.result._id,
      action: "Ticket_Created",
      details: "Ticket created",
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

const getAllTickets = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    let query = {};

    if (permissions.includes("TICKET_VIEW_ALL")) {
      query = { isDeleted: false };
    } else if (permissions.includes("TICKET_VIEW_ASSIGNED")) {
      query = {
        isDeleted: false,
        assignedAgent: req.result._id,
      };
    } else if (permissions.includes("TICKET_VIEW_OWN")) {
      query = {
        isDeleted: false,
        customer: req.result._id,
      };
    } else {
      return res.status(403).json({
        message: "You are not allowed to view tickets",
      });
    }

    const { view } = req.query;

    if (view === "all") {
      if (!permissions.includes("TICKET_VIEW_ALL")) {
        return res.status(403).json({
          message: "You are not allowed to view all tickets",
        });
      }

      query = { isDeleted: false };
    }

    if (view === "assigned") {
      if (!permissions.includes("TICKET_VIEW_ASSIGNED")) {
        return res.status(403).json({
          message: "You are not allowed to view assigned tickets",
        });
      }

      query.assignedAgent = req.result._id;
    }

    if (view === "own") {
      if (!permissions.includes("TICKET_VIEW_OWN")) {
        return res.status(403).json({
          message: "You are not allowed to view your tickets",
        });
      }

      query.customer = req.result._id;
    }

    // SEARCH
    const { search } = req.query;

    if (search?.trim()) {
      const searchRegex = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );

      query.$or = [
        {
          ticketId: searchRegex,
        },
        {
          title: searchRegex,
        },
        {
          description: searchRegex,
        },
        {
          category: searchRegex,
        },
      ];
    }

    //STATUS FILTER
    const { status } = req.query;

    if (status) {
      query.status = status;
    }

    //PRIORITY FILTER
    const { priority } = req.query;

    if (priority) {
      query.priority = priority;
    }

    // CATEGORY FILTER
    const { category } = req.query;

    if (category) {
      query.category = category;
    }

    // AGENT FILTER
    const { assignedAgent } = req.query;

    if (assignedAgent) {
      if (permissions.includes("TICKET_VIEW_ALL")) {
        query.assignedAgent = assignedAgent;
      } else if (permissions.includes("TICKET_VIEW_ASSIGNED")) {
        query.assignedAgent = req.result._id;
      }
    }
    //PAGINATION
    let page = parseInt(req.query.page) || 1;

    let limit = parseInt(req.query.limit) || 10;

    if (page < 1) {
      page = 1;
    }

    if (limit < 1) {
      limit = 10;
    }

    if (limit > 100) {
      limit = 100;
    }

    const skip = (page - 1) * limit;

    //SORTING
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "priority",
      "status",
      "title",
    ];

    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "createdAt";

    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // COUNT
    const totalTickets = await Ticket.countDocuments(query);

    //FETCH TICKETS
    const tickets = await Ticket.find(query)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email")
      .populate("attachments")
      .sort({
        [sortBy]: sortOrder,
      })
      .skip(skip)
      .limit(limit);

    // PAGINATION INFORMATION
    const totalPages = Math.ceil(totalTickets / limit);

    return res.status(200).json({
      message: "Tickets fetched successfully",
      count: tickets.length,
      data: tickets,
      pagination: {
        currentPage: page,
        limit,
        totalTickets,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch tickets",
      error: err.message,
    });
  }
};

const getTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId)
      .populate("customer", "name email")
      .populate("assignedAgent", "name email")
      .populate("attachments");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const permissions = req.result.role.permissions.map((p) => p.name);

    const isowner =
      ticket.customer?._id.toString() === req.result._id.toString();
    const isassigned =
      ticket.assignedAgent?._id.toString() === req.result._id.toString();

    const allowed =
      permissions.includes("TICKET_VIEW_ALL") ||
      (permissions.includes("TICKET_VIEW_ASSIGNED") && isassigned) ||
      (permissions.includes("TICKET_VIEW_OWN") && isowner);
    if (!allowed) {
      return res.status(403).json({
        message: "You are not allowed to view this ticket",
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

    const oldStatus = ticket.status;
    const oldPriority = ticket.priority;

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

    if (status !== undefined && oldStatus !== status) {
      await Activity.create({
        ticket: ticket._id,
        performedBy: req.result._id,
        action:
          status === "Resolved"
            ? "Ticket_Resolved"
            : status === "Closed"
              ? "Ticket_Closed"
              : "Status_Changed",
        details: `Status changed from ${oldStatus} to ${status}`,
      });
    }

    if (priority !== undefined && oldPriority !== priority) {
      await Activity.create({
        ticket: ticketId,
        perfomedBy: req.result._id,
        action: "Priority_Changed",
        details: `Priority changed from ${oldPriority} to ${priority}`,
      });
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

const updateTicketStatus = async (req, res) => {
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
      action:
        status === "Resolved"
          ? "Ticket_Resolved"
          : status === "Closed"
            ? "Ticket_Closed"
            : "Status_Changed",
      details: `Status changed from ${oldStatus} to ${status}`,
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

const updateTicketPriority = async (req, res) => {
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

const uploadTicketAttachment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image.",
      });
    }

    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found.",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `helpdesk/tickets/${ticket.ticketId}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });

    const attachment = await Attachment.create({
      ticket: ticket._id,
      fileName: req.file.originalname,
      url: result.secure_url,
      public_id: result.public_id,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    ticket.attachments.push(attachment._id);
    await ticket.save();

    return res.status(201).json({
      message: "Image uploaded successfully.",
      attachment,
    });
  } catch (error) {
    console.error("UPLOAD ATTACHMENT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { assignedAgent } = req.body;

    if (!assignedAgent) {
      return res.status(403).json({
        message: "Assigned agent is required",
      });
    }

    const Agent = await User.findById(assignedAgent).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!Agent || !Agent.role) {
      return res.status(400).json({
        message: "Agent not found",
      });
    }

    const agentPermissions = Agent.role.permissions.map((p) => p.name);

    if (!agentPermissions.includes("TICKET_RECEIVE_ASSIGNED")) {
      return res.status(403).json({
        message: "this user is not allowed to receive ticktes",
      });
    }

    const ticket = await Ticket.findById(ticketId);

    if (ticket.assignedAgent != null)
      return res.status(403).json({
        message: "This Ticket is already assigned to any agent",
      });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.assignedAgent = Agent._id;
    ticket.status = "In Progress";

    await ticket.save();

    await Activity.create({
      ticket: ticket._id,
      performedBy: req.result._id,
      action: "Ticket_Assigned",
      details: `Ticket is assigned to ${Agent.name}`,
    });

    return res.status(200).json({
      message: "Ticket assigned successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getActivity = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const existTicket = await Ticket.findById(ticketId);
    if (!existTicket) {
      return res.status(404).json({
        message: "Ticket not Found",
      });
    }

    const permissions = req.result.role.permissions.map((p) => p.name);

    const isOwner =
      existTicket.customer._id.toString() === req.result._id.toString();
    const isAssigned =
      existTicket.assignedAgent._id.toString() === req.result._id.toString();

    const allowed =
      permissions.includes("TICKET_VIEW_ALL") ||
      (permissions.includes("TICKET_VIEW_ASSIGNED") && isAssigned) ||
      (permissions.includes("TICKET_VIEW_OWN") && isOwner);

    if (!allowed) {
      return res.status(403).json({
        message: "You are not allowed to view activities of this ticket",
      });
    }

    let query = {
      ticket: ticketId,
    };

    if (!permissions.includes("INTERNAL_NOTE_VIEW")) {
      query.action = { $ne: "Internal_Note_Added" };
    }

    const activities = await Activity.find(query)
      .populate("performedBy", "name email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      message: "Activites fetched successfully",
      activities,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (ticket.isDeleted) {
      return res.status(400).json({
        message: "Ticket is already deleted",
      });
    }

    ticket.isDeleted = true;
    ticket.deletedAt = new Date();

    await ticket.save();

    await Activity.create({
      ticket: ticket._id,
      performedBy: req.result._id,
      action: "TICKET_DELETED",
      details: "Ticket soft deleted",
    });

    return res.status(200).json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  assignTicket,
  getActivity,
  updateTicketPriority,
  updateTicketStatus,
  uploadTicketAttachment,
  deleteTicket,
};
