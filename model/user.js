const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcryptjs")

//name, email, password photo, role

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

       photo:String,
    },
    {timestamps:true}
)

userSchema.pre("save", async function(next){
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


const User=mongoose.model("user",userSchema)

module.exports=User