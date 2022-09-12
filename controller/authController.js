const {asyncCatch} = require("../utils/asyncCatch")
const User = require("../model/user")
const jwt = require("jsonwebtoken")
const GlobalError = require("../error/GlobalError")

function signJWT(id){
    const token = jwt.sign({id: id}, process.env.JWT_SIGNATURE,{
        expiresIn:process.env.JWT_EXPIRE
    })

    return token
}

exports.signup = asyncCatch(async(req,res,next)=>{
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const token = signJWT(user._id)

    res.json({ success:true, data:{ user, token } })
})


exports.login = asyncCatch(async(req,res,next)=>{

    //1) Check if email and psw provided
    const {email, password} = req.body

    if(!email || !password) 
        return next(new GlobalError("Please provide email and password!"))

    //2) Check if Email exist and password correct
    const user = await User.findOne({email}).select("+password")

    if(!user || !(await user.checkPassword(password, user.password)))
        return next(new GlobalError("Email or password incorrect!"))


    //! Sign JWT
    const token = signJWT(user._id)
    
   
    res.json({ success:true, data:{ token:token } })
})

