const mongoose = require("mongoose");
const {Schema} = mongoose;

const activitySchema = new Schema(
  {
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "ticket",
      required: true,
    },

    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "TICKET_CREATED",
        "TICKET_ASSIGNED",
        "STATUS_CHANGED",
        "PRIORITY_CHANGED",
        "COMMENT_ADDED",
        "TICKET_RESOLVED",
        "TICKET_CLOSED",
      ],
      required: true,
    },

    details: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("activity", activitySchema);