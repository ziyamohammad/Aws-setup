import mongoose from "mongoose"

const connectdb = async()=>{
   try {
     const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
     console.log(`Database connected \n db Host = ${connectioninstance.connection.host}`)
   } catch (error) {
     console.log("Something went wrong in connecting to db ",error)
   }
}

export {connectdb}