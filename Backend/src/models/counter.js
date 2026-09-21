const mongoose = require("mongoose");
const {Schema}=mongoose;

const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  sequence: {
    type: Number,
    default: 0,
  },
});

const Counter=mongoose.model("counter",counterSchema);
module.exports=Counter