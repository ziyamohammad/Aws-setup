import dotenv from "dotenv"
import app from "./app.js"
import { connectdb } from "./database/connectdb.js"

dotenv.config({
    path:"./env"
})

const PORT = process.env.PORT

connectdb()
.then(()=>{
    app.listen(PORT,()=>{
       console.log(`App is Listening on Port ${PORT}`)
    })
})
.catch((error)=>{
    console.log("Error Connecting to DB",error)
})