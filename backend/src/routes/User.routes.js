import {Router} from "express"
import { getalluser, getuser, Login, logoutuser, Signup } from "../controller/User.controllers.js"
import { verifyjwt } from "../middleware/auth.middleware.js"

const router = Router()

router.route("/signup").post(Signup)
router.route("/login").post(Login)


//get apis
router.route("/getuser").get(verifyjwt,getuser)
router.route("/logoutuser").get(verifyjwt,logoutuser)
router.route("/getalluser").get(getalluser)



export {router}