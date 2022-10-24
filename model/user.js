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

       lastName:{
        type: String,
        required: [true, "Please provide a lastName!"]
       },

       email:{
        type: String,
        unique: [true,"Invalid email address"],
        lowercase: true,
        required: [true],
        validate:[
            {
            validator: validator.isEmail,
            message: "Provide a correct an email!"
            },
            {
                validator: async function(email) {
                    const user = await this.constructor.findOne({ email });
                    if(user) {
                      if(this.id === user.id) {
                        return true;
                      }
                      return false;
                    }
                    return true;
                  },
                  message: props => 'The specified email address is already in use.'
            },
        ],
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

       phone:{
            type: String,
            required: [true, "Please confirm the phone number!"],
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{2}(-|\s)\d{2}$/,
       },

       forgetPassword: {
        type: String,
      },

      resetExpires: Date,
       role:{
        type: String,
        enum:["user", "admin", "guide"],
        delete: "user",
       },

       photo:String,
    },
    {timestamps:true}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  
    next();
  });

userSchema.methods.checkPassword = async function(
    realPassword, 
    cryptedPassword
){
    return await bcrypt.compare(realPassword.toString(), cryptedPassword)
}

userSchema.methods.generatePassToken = async function () {
    const resetToken = crypto.randomBytes(48).toString("hex")

    const hashPassword = crypto.createHash("md5").update(resetToken).digest("hex")

    this.forgetPassword = hashPassword;
    this.resetExpires=Date.now() + 15 * 60 * 1000;

    return resetToken;
}


const User=mongoose.model("user",userSchema)

module.exports=User