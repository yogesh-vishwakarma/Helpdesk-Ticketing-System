const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 80,
    minlength:2
   },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true
   },
  password: { 
    type: String,
    required: true
  },
  role: {
  type: Schema.Types.ObjectId,
  ref: "role",
  required: true,
}
}, { timestamps: true });

const User=mongoose.model('user', userSchema);
module.exports=User;
