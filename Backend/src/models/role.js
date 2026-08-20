const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    permissions: [
      {
        type: String,
        enum: [
          "create_ticket",
          "view_own_ticket",
          "view_all_tickets",
          "update_ticket",
          "assign_ticket",
          "delete_ticket",
          "add_comment",
          "add_internal_note",
          "manage_users",
          "manage_roles",
          "view_dashboard",
        ],
      },
    ],

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model('role', roleSchema);
module.exports = Role;

