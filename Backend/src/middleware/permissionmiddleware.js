const User=require("../models/user");

const checkPermission=(permissionName)=>{
    return async (req,res,next)=>{
      try{
        const user=await User.findById(req.result._id).populate({
         path:'role',
         populate:{
            path:"permissions"
         }
        })

        if(!user||!user.role){
          return res.status(403).json({
           message:"Access denied"  
          })
        }

        const hasPermission=user.role.permissions.some((p)=>p.name===permissionName);
         
        if(!hasPermission){
            return res.status(403).json({
                message:"You do not have permission to perform this actoin"
            })
        }

        req.result = user;
        next();
      }
      catch(err){
       return res.status(500).json({
        message:err.message
       })
      }
     } 
}

module.exports=checkPermission;