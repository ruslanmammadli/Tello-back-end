const express = require("express");
const router = express.Router();

const authController = require("../controller/authController")

// POST //*Create user*//
router.post("/signup",authController.signup)
router.post("/login",authController.login)

router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:token",authController.resetPassword)


module.exports=router;