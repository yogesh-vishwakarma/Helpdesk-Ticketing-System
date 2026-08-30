const bcrypt = require("bcrypt");
const Role = require("../models/role");
const User = require("../models/user");
const Permission=require("../models/permission");


//=====================================================
//PERMISSION MANAGEMENT
//=====================================================
const createPermission=async (req,res)=>{
     
     try{
         
      const {name,description}=req.body;

       if(!name || !description){
        return res.status(404).json(
          {
            message:"Name and Description is required"
          }
        )
       }
       
       const alreadyexist=await Permission.findOne({name:name.trim()});
       if(alreadyexist)
        {
          return res.status(409).json({
            message:"Permission already exist"
          }
        )} 
          
        const permission=await Permission.create({
           name:name.trim(),
           description,
        });

    return res.status(201).json({
      message:"Permission Created Successfully",
      permission
     })

     }
     catch(err){
          res.status(500).json({
            message:err.message
          })
     }

}

const getPermissions=async (req,res)=>{
    try{
     const permission=await Permission.find().sort({createdAt:-1});
     
     if(!permission){
      return res.send("No Permission Exist");
     }

     res.status(200).json({
      permission
     })
    }
    catch(err){
       res.status(500).json({
        message:err.message
       })
    }
}

const updatePermission=async (req,res)=>{

  try{      
   const {id}=req.params; 
   const {name,description}=req.body;
   const permission=await Permission.findById(id);
   if(!permission){
     return res.status(404).json({
      message:"Permission document not Exist"
     })
   }
   
   if(name!==undefined)
     permission.name=name;

   if(description!==undefined)
     permission.description=description;


   await permission.save();

   res.status(200).json({
     message:"Permission Updated successfully"
   })
}
  catch(err){
     res.status(500).json({
      message:err.message
     })
  }
}

const deletePermission=async (req,res)=>{
    try{
         const {id}=req.params;
   
        const permission=await Permission.findById(id);
        if(!permission){
            return res.status(404).json({
              message:"Permmission document not exist"
            })
        }

         await Permission.findByIdAndDelete(id);
         res.send("Permission deleted Successfully")
    }
    catch(err){
        res.status(500).json({
          message:err.message
      })
    }
}

// =====================================================
// ROLE MANAGEMENT
// =====================================================

const createRole = async (req, res) => {
  try {
    const { roleName, description, permissions=[] } = req.body;

    if (!roleName) {
      return res.status(400).json({
        message: "Role name is required",
      });
    }

    const existingRole = await Role.findOne({
      roleName: roleName.trim(),
    });

    if (existingRole) {
      return res.status(409).json({
        message: "Role already exists",
      });
    }

     const existingPermission=await Permission.find(
      {
        _id: {$in:permissions}
      }
    );
       
    if(existingPermission.length!==permissions.length)
    {
      return res.status(404).json({
        message:"One or more permission IDs do not exist"
      })
    }

    const role = await Role.create({
      roleName: roleName.trim(),
      description,
      permissions: permissions || [],
    });

    return res.status(201).json({
      message: "Role created successfully",
      role,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permisssions').sort({ createdAt: -1 });

    return res.status(200).json({
      roles,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { roleName, description, permissions } = req.body;

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    if (roleName) {
      const existingRole = await Role.findOne({
        roleName: roleName.trim(),
        _id: { $ne: roleId },
      });

      if (existingRole) {
        return res.status(409).json({
          message: "Role name already exists",
        });
      }

      role.roleName = roleName.trim();
    }

    if (description !== undefined) {
      role.description = description;
    }

    if (permissions !== undefined) {
      role.permissions = permissions;
    }

    await role.save();

    return res.status(200).json({
      message: "Role updated successfully",
      role,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    // Check whether any user is using this role
    const usersUsingRole = await User.countDocuments({
      role: roleId,
    });

    if (usersUsingRole > 0) {
      return res.status(400).json({
        message: "Cannot delete role because users are assigned to it",
      });
    }

    await Role.findByIdAndDelete(roleId);

    return res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


// =====================================================
// USER MANAGEMENT
// =====================================================

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password and roleId are required",
      });
    }

    // Check whether role exists
    const existrole = await Role.findById(role);

    if (!existrole) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: existrole._id,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.roleName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
   const users = await User.find()
   .populate({
      path: "role",
      populate: {
      path: "permissions",
     },
    })
    .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({
        message: "roleId is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    user.role = role._id;

    await user.save();

    return res.status(200).json({
      message: "User role updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.roleName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent Admin from deleting himself
    if (req.result._id.toString() === userId) {
      return res.status(400).json({
        message: "Admin cannot delete their own account",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {createRole,getRoles,updateRole,deleteRole,createUser,getUsers,updateUserRole,deleteUser,createPermission,getPermissions,updatePermission,deletePermission};
