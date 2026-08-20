const mongoose = require("mongoose");
const {Schema} = mongoose;

const commentSchema = new Schema(
  {
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["comment", "internal_note"],
      default: "comment",
    },

    attachment: {
      url: {
        type: String,
        trim: true,
      },

    fileName: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;