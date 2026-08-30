const mongoose = require("mongoose");
const {Schema}=mongoose;

const roleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description:{
      type: String,
      trim: true,
    },
    permissions:[
      {
        type:Schema.Types.ObjectId,
        ref:'permission'
     },
    ],
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model('role', roleSchema);
module.exports = Role;