const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  
  getUserDetails,
  updatePassword,
  getSingleUser,

} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(updatePassword);

router.route("/user/:id").get(getSingleUser);


module.exports = router;
