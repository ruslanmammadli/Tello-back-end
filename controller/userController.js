const {asyncCatch} = require("../utils/asyncCatch")
const User = require("../model/user")
const GlobalError = require("../error/GlobalError")

exports.changeUserData = asyncCatch(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        email: req.body.email,
    })

    res.status(200).json({success:true, user})
})