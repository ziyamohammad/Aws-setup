
import { User } from "../models/User.models.js";
import { Apierror } from "../utils/Apierror.utils.js";
import { Apiresponse } from "../utils/Apiresponse.utils.js";
import { asynchandler } from "../utils/Asynchandler.utils.js";

const Signup = asynchandler(async(req,res)=>{
  const {name,email,password} = req.body

  if(!name || !email || !password ){
    throw new Apierror(404,"Please fill all the required details")
  }

  const existeduser = await User.findOne({
    $or:[{email}]
  })
  if(existeduser){
    throw new Apierror(400,"User Already Registered")
  }

 const user = await User.create({
    name:name,
    email:email,
    password:password,
  })
   
   res.status(200)
  .json(new Apiresponse(201,"User Registerd Successfully",user))
})

const Login = asynchandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password ){
    throw new Apierror(404,"Please fill all the required details")
  }

  const user = await User.findOne({email:email})
  if(!user){
    throw new Apierror(404,"No User Found")
  }

  const passwordcorrect = await user.isPasswordCorrect(password)

  if(!passwordcorrect){
    throw new Apierror(400,"Incorrect Password")
  }

  const token = await user.Token()
  if(!token){
    throw new Apierror(400,"Token Not Generated")
  }

  const options = {
    httpOnly:true,
    secure: false,     
  sameSite:"lax" ,
    maxAge:7*24*60*60*1000
  }

  res.status(200)
  .cookie("token",token,options)
  .json(new Apiresponse(201,"User LoggedIn Successfully",user))

})
const logoutuser = asynchandler(async(req,res)=>{
    const logoutuser = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{refreshtoken:undefined}
        },
        {
            new:true
        }
    )

    const options = {
  httpOnly: true,
  secure: true,     
  sameSite:"None"    
}
   return  res.status(200)
    .clearCookie("token",options)
    .json(new Apiresponse(200,"User loggedout successfully",{}))
 


})

const getuser = asynchandler(async(req,res)=>{
  const user = req.user
  
  
  const loginuser = await User.findById(user._id)


  if(!loginuser){
    throw new Apierror(404,"User not Aiuthorized")
  }

  res.status(200)
  .json(new Apiresponse(201,"User Fetched Successfully",loginuser))
})
const getalluser = asynchandler(async(req,res)=>{
  const alluser = await User.find();
  if(!alluser){
    throw new Apierror(400,"No user found")
  }

  res.status(200)
  .json(new Apiresponse(201,"User Fetched Successfully",alluser))
})


export {Signup,Login,getuser,getalluser,logoutuser}