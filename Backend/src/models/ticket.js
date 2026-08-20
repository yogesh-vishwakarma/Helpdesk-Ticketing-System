const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    assignedAgent: {
      type: Schema.Types.ObjectId,
      ref:'user',
      default: null,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Waiting", "Resolved", "Closed"],
      default: "Open",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    attachments: [
      {
        url: {
          type: String,
          trim: true,
        },

        fileName: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('ticket', ticketSchema);
module.exports = Ticket;    