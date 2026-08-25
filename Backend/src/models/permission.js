const mongoose=require("mongoose");
const {Schema}=mongoose;

const permissionSchema=new Schema({
    name:{
        type:String,
        required:true,
        maxlength:80,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        trim:true
    }
},{timestamps:true})

const Permission=mongoose.model('permission',permissionSchema);
module.exports=Permission;