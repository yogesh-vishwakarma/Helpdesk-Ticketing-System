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
        "Ticket_Created",
        "Ticket_Assigned",
        "Status_Changed",
        "Priority_Changed",
        "Comment_Added",
        "Internal_Note_Added",
        "Ticket_Resolved",
        "Ticket_Closed",
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

const Activity =mongoose.model("activity", activitySchema);
module.exports=Activity;