const express=require('express');
const authRouter=express.Router();
const {register,login,logout}=require('../controllers/userAuthent')
const userMiddleware = require("../middleware/usermiddleware");

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
//authRouter.post('/admin/register',adminMiddleware ,adminRegister);
//authRouter.delete('/deleteProfile',userMiddleware,deleteProfile);

module.exports=authRouter;