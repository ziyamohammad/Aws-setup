import React, { useState } from 'react'
import styles from "../CSS/Authpage.module.css"
import { Eye, EyeOff} from 'lucide-react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import {toast} from "react-toastify"

const Authpage = () => {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate = useNavigate()
    const[hidden,sethidden]=useState(true)
    const [loading, setLoading] = useState(false);


    const handlesignup = async(e)=>{
      e.preventDefault()
      setLoading(true)
      //  const formdata = new FormData()
      //   formdata.append("name",name)
      //   formdata.append("email",email)
      //   formdata.append("password",password)
        
      try {
        const response = await axios.post("/api/api/v1/admin/signup",
          {
            name:name,
            email:email,
            password:password
          }
          ,{withCredentials:true})
        console.log(response.data.data)
        toast.success("User Registered Successfully")
        setName("")
        setEmail("")
        setPassword("")
        navigate("/login")
      } catch (error) {
        toast.error("Something Went Wrong in Registering User")
      }finally{
        setLoading(false)
      }
    }
  return (
    <>
     <div className={styles.videobg}>
  <video autoPlay muted loop playsInline>

    <source src="/bgvideo.mp4" type="video/mp4" />
  </video>
</div>
    <div className={styles.signup}>
     <div className={styles.navbar}>
  <div className={styles.brand}>
    {/* <div className={styles.logoWrap}>
      <img src="/applogo.png" alt="Nexora logo" />
    </div> */}
    <span className={styles.brandText}>logo</span>
  </div>
</div>

     <div className={styles.form1}>
        <h1>Create Your Account</h1>
        <form>
        <div className={styles.name}>
            <label for ="name">Name</label>
            <input type="text" className={styles.namein} name='name' placeholder="Enter Your name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
        </div>
        <div className={styles.name}>
            <label>Email</label>
            <input type="email" className={styles.namein} placeholder="name@gmail.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
        </div>
        <div className={styles.name}>
            <label>Password</label>
           <div className={styles.inputicon}>
            <input type={hidden ?"password":"text"} className={styles.nameinpass} placeholder="Enter Your Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            {hidden ?(<EyeOff color="white" onClick={()=>{sethidden(false)}}/>):(<Eye color="white" onClick={()=>{sethidden(true)}}/>)}
            </div>
        </div>
       
        <button className={styles.buttonsubmit} onClick={handlesignup}>Sign Up</button>
        </form>
        <div className={styles.signintext}>
            Already have an account ? <span onClick={()=>{navigate("/login")}}>Login</span>
        </div>
     </div>
    </div>
    {loading && (
  <div className={styles.loadingOverlay}>
    <div className={styles.loader}></div>
    <p className={styles.loadingText}>Creating your account...</p>
  </div>
)}
    </>
  )
}

export default Authpage
