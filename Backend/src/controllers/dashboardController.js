const Ticket = require("../models/ticket");
const User = require("../models/user");

const getDashboardSummary = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    let query = {isDeleted: false};

    if (permissions.includes("TICKET_VIEW_ALL")) {
      query = {isDeleted: false};
    } else if (permissions.includes("TICKET_VIEW_ASSIGNED")) {
      query = { isDeleted: false, assignedAgent: req.result._id };
    } else if (permissions.includes("TICKET_VIEW_OWN")) {
      query = { isDeleted: false, customer: req.result._id };
    } else {
      return res.status(403).json({
        message: "You are not allowed to view dashboard",
      });
    }

    const totalTickets = await Ticket.countDocuments(query);

    const openTickets = await Ticket.countDocuments({
      ...query,
      status: "Open",
    });
    const inProgressTickets = await Ticket.countDocuments({
      ...query,
      status: "In Progress",
    });

    const resolvedTickets = await Ticket.countDocuments({
      ...query,
      status: "Resolved",
    });

    const closedTickets = await Ticket.countDocuments({
      ...query,
      status: "Closed",
    });

    const unassignedTickets = await Ticket.countDocuments({
      ...query,
      assignedAgent: null,
    });

    return res.status(200).json({
      message: "Dashboard summary fetched successfully",
      data: {
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
        closedTickets,
        unassignedTickets,
      },
    });
  } catch (err) {
    return res.status(404).json({
      messgae: err.message,
    });
  }
};

const getTicketsByStatus = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    let query = {};

    if (permissions.includes("TICKET_VIEW_ALL")) {
      query = {isDeleted: false};
    } else if (permissions.includes("TICKET_VIEW_ASSIGNED")) {
      query = {isDeleted: false, assignedAgent: req.result._id };
    } else if (permissions.includes("TICKET_VIEW_OWN")) {
      query = {isDeleted: false, customer: req.result._id };
    } else {
      return res.status(403).json({
        message: "You are not allowed to view tickets",
      });
    }

    const tickets = await Ticket.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          tickets: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
          tickets: 1,
        },
      },
    ]);

    return res.status(200).json({
      message: "Tickets fetched successfully",
      data: tickets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTicketsByPriority = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    let query = {isDeleted: false};

    if (permissions.includes("TICKET_VIEW_ALL")) {
      query = {};
    } else if (permissions.includes("TICKET_VIEW_ASSIGNED")) {
      query = {isDeleted: false, assignedAgent: req.result._id };
    } else if (permissions.includes("TICKET_VIEW_OWN")) {
      query = {isDeleted: false, customer: req.result._id };
    } else {
      return res.status(403).json({
        message: "You are not allowed to view tickets",
      });
    }

    const tickets = await Ticket.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
          tickets: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          priority: "$_id",
          count: 1,
          tickets: 1,
        },
      },
    ]);

    return res.status(200).json({
      message: "Tickets fetched successfully",
      data: tickets,
    });
  } catch (err) {
    return res.status(403).json({
      message: "err.message",
    });
  }
};

const getTicketsByCategory = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    let query = {};

    if (permissions.includes("TICKET_VIEW_ALL")) {
      query = {isDeleted: false};
    } else if (permissions.includes("TICKET_VIEW_ASSIGNED")) {
      query = {isDeleted: false, assignedAgent: req.result._id };
    } else if (permissions.includes("TICKET_VIEW_OWN")) {
      query = {isDeleted: false, customer: req.result._id };
    } else {
      return res.status(403).json({
        message: "You are not allowed to view tickets",
      });
    }

    const tickets = await Ticket.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          tickets: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
          tickets: 1,
        },
      },
    ]);

    return res.status(200).json({
      message: "Tickets fetched successfully",
      data: tickets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTicketRecent = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    let query = {isDeleted: false};

    if (permissions.includes("TICKET_VIEW_ALL")) {
      query = {isDeleted: false};
    } else if (permissions.includes("TICKET_VIEW_ASSIGNED")) {
      query = {isDeleted: false, assignedAgent: req.result._id };
    } else if (permissions.includes("TICKET_VIEW_OWN")) {
      query = {isDeleted: false, customer: req.result._id };
    } else {
      return res.status(403).json({
        message: "You are not allowed to view tickets",
      });
    }

    const tickets = await Ticket.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
    ]);

    return res.status(200).json({
      message: "Recent Tickets fetched successfully",
      count: tickets.length,
      data: tickets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUnassignedTickets = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    let query = {isDeleted: false};

    if (permissions.includes("TICKET_VIEW_ALL")) {
      query = {isDeleted: false, assignedAgent: null };
    } else if (permissions.includes("TICKET_VIEW_OWN")) {
      query = {isDeleted: false, assignedAgent: null, customer: req.result._id };
    } else {
      return res.status(403).json({
        message: "You are not allowed to view tickets",
      });
    }

    const tickets = await Ticket.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json({
      message: " Unassigned Tickets fetched successfully",
      count: tickets.length,
      data: tickets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAgents = async (req, res) => {
  try {
    const permissions = req.result.role.permissions.map((p) => p.name);

    if (!permissions.includes("AGENT_VIEW")) {
      return res.status(403).json({
        message: "You do not have permission to view agents",
      });
    }

    const agents = await User.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "roleData",
        },
      },
      {
        $unwind: "$roleData",
      },
      {
        $lookup: {
          from: "permissions",
          localField: "roleData.permissions",
          foreignField: "_id",
          as: "permissionData",
        },
      },
      {
        $match: {
          "permissionData.name": "TICKET_RECEIVE_ASSIGNED",
        },
      },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "assignedAgent",
          as: "tickets",
        },
      },

      // 6. Return required fields
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          totalTickets: {
            $size: "$tickets",
          },
        },
      },
    ]);

    return res.status(200).json({
      message: "Agents fetched successfully",
      count: agents.length,
      data: agents,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
  getTicketsByStatus,
  getTicketsByPriority,
  getTicketsByCategory,
  getTicketRecent,
  getUnassignedTickets,
  getAgents,
};

// ["Open", "In Progress", "Waiting", "Resolved", "Closed"],
