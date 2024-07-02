const ErrorHandler = require("../utils/errorhandler");

const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");


const catchAsyncErrors=require("../middleware/catchAsyncErrors");

//Register User
exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
const {name,email,password}=req.body;

console.log(req.body)
const user=await User.create({
    name,email,password,
})


sendToken(user,200,res);

})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both
// console.log(req.body);
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
   
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});


//Logout User

exports.logout=catchAsyncErrors(async(req,res,next)=>{

res.cookie("token",null,{
  expires:new Date(Date.now()),
  httpOnly:true,
})
  res.status(200).json({
    success:true,
    message:"Logged out"
  })
})




//get user detail
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
  // console.log(req.user.id)
  // console.log(req.user._id)
  // console.log(req.user)
  const user=await User.findById(req.user.id)

  res.status(200).json({
    success:true,
    user,

  })
}
)

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});



exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});





