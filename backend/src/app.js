import express from "express"
import cors from "cors"
import { router } from "./routes/User.routes.js"
import cookieParser from "cookie-parser"


const app = express()
app.set("trust proxy", 1);
const allowedOrigins = [
  "http://localhost",
  "http://localhost:3000"
];
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))

app.use(express.json({limit:"16mb"}))
app.use(express.urlencoded({extended:true,limit:"16mb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/admin",router)



export default app