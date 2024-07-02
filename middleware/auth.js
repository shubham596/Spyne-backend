const jwt=require("jsonwebtoken")
const User=require("../models/userModel")

exports.isAuthenticatedUser=async(req,res,next)=>{
    const {token}=req.cookies;
      console.log("tokein is ",token)
if(!token){
    return next(Error("Error occured"));
}
  
const decodeData=jwt.verify(token,process.env.JWT_SECRET)
   req.user= await User.findById(decodeData.id)
   next()
}