import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})

UserSchema.pre("save",async function(){
  if(!this.isModified("password"))return null
   this.password =  await bcrypt.hash(this.password,10)
})

UserSchema.methods.isPasswordCorrect = async function(password){
    if(!password) return null
    return bcrypt.compare(password,this.password)
}

UserSchema.methods.Token = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },

    process.env.SECRET_TOKEN ,
{
    expiresIn:process.env.SECRET_TOKEN_EXPIRY
})
}

export const User = new mongoose.model("User",UserSchema)