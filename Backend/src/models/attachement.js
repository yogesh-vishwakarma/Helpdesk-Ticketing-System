const mongoose=require("mongoose");
const {Schema}=mongoose;

const attachmentSchema=new Schema(
    {
    ticket:{
        type:Schema.Types.ObjectId,
        ref:"ticket",
        required:true
    },
    fileName:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true,
        trim:true
    },
    public_id:{
        type:String,
        required:true,
        trim:true
    },
    mimeType:{
        type:String,
        required:true,
        trim:true
    },
    size:{
        type:Number,
        required:true
    }
    },
    {
        timestamps:true
    }
)

const Attachement=mongoose.model("attachment",attachmentSchema);

module.exports=Attachement;