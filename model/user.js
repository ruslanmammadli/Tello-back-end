const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcryptjs")
const crypto = require("crypto");
const { type } = require('os');

const userSchema=mongoose.Schema({
       name:{
        type: String,
        required: [true, "Please provide a name!"]
       },

       email:{
        type: String,
        unique: true,
        lowercase: true,
        required: [true],
        validate:[validator.isEmail, "Provide a correct an email!"]
       },

       password:{
        type: String,
        required: [true, "Please provide a password!"],
        select: false
       },

       passwordConfirm:{
        type: String,
        required: [true, "Please confirm the password!"],
        validate: {
            validator: function (el){
                return el === this.password
            },
            message: "Password are not the same!"
        }
       },

       forgetPassword:String,

       role:{
        type: String,
        enum:["user", "admin", "guide"],
        delete: "user",
       },

       photo:String,
    },
    {timestamps:true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    
    next()
})

userSchema.methods.checkPassword = async function(
    realPassword, 
    cryptedPassword
){
    return await bcrypt.compare(realPassword.toString(), cryptedPassword)
}

userSchema.methods.generatePassToken = async function () {
    const resetToken = crypto.randomBytes(48).toString("hex")

    this.forgetPassword = await bcrypt.hash(resetToken, 8)

    return resetToken;

}


const User=mongoose.model("user",userSchema)

module.exports=User