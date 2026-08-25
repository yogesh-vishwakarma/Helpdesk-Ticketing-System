const mongoose=require("mongoose");
const {Schema}=mongoose;

const commentSchema=new Schema({
  ticket:{
    type:Schema.Types.ObjectId,
    ref:'ticket'
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  message:{
    type:String,
    required:true,
    trim:true
  },
  type:{
    type:String,
    enum:["comment","internal_note"],
    required:true,
    default:"comment"  
  },
  attachment:{
    type:String,
    default:null
  }
},{ timestamps:true })

const Comment=new mongoose.model('comment',commentSchema);
module.exports=Comment;