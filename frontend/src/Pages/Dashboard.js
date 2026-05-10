import React, { useEffect, useState } from "react";
import styles from "../CSS/Dashboard.module.css";


import {
  LayoutDashboard,
  Heart,
  Clock,
  FolderOpen,
  Database,
} from "lucide-react";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const[user,setuser]=useState({})
  const[alluser,setalluser]=useState([])
   const [loading, setLoading] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);

const dummyTasks = [
  { id: 1, title: "Build Login API" },
  { id: 2, title: "Fix Dashboard UI" },
  { id: 3, title: "Integrate Payment" }
];

const dummyLeads = [
  { id: 1, name: "Startup Client" },
  { id: 2, name: "College Project" },
  { id: 3, name: "Freelance Lead" }
];



   const handleLogout = async() => {
  try {
    setLoading(true)
    const response = await axios.get("/api/api/v1/admin/logoutuser",{withCredentials:true})
    console.log(response.data)
    toast.success("User Logged Out Successfully deployed")
    navigate("/login")
  } catch (error) {
    toast.error("user cannot logout")
  }finally{
    setLoading(false)
  }
  
};

  useEffect(()=>{
    (async()=>{
      const response = await axios.get("/api/api/v1/admin/getuser",{withCredentials:true})
      console.log(response.data.data)
      setuser(response.data.data)
    })()
  },[])
  useEffect(()=>{
    (async()=>{
      const response = await axios.get("/api/api/v1/admin/getalluser",{withCredentials:true})
      console.log(response.data.data)
      setalluser(response.data.data)
    })()
  },[])

  // useEffect(()=>{
  //   (async()=>{
  //     const response = await axios.get("http://localhost:5000/api/v1/admin/alltopic",{withCredentials:true})
  //     console.log(response.data.data)
  //     settopic(response.data.data)
  //   })()
  // },[user])
//   useEffect(() => {
//   if (!selectedtopic?._id) return

//   (async () => {
//     const res = await axios.get(
//       `http://localhost:5000/api/v1/admin/resources/${selectedtopic._id}`,
//       { withCredentials: true }
//     )
//     setResources(res.data.data)
//   })()
// }, [selectedtopic])

  // const handleadd = async()=>{
  //   try {
  //     setLoading(true)
  //     console.log(tagsarray)

  //     const response = await axios.post("http://localhost:5000/api/v1/admin/addtopic",{
  //       topicname:topictitle,
  //       tags:tagsarray
  //     },{withCredentials:true})
  //     console.log(response.data.data)
  //     setModal(false)
  //        toast.success("Topic Added Successfully")
  //        window.location.reload()
  //   } catch (error) {
  //     toast.error("Something went wrong in adding the topics")
  //   }finally{
  //     setLoading(false)
  //   }
    
  // }
  // const handleremove = (i) =>{
  //   const filtered = tagsarray.filter(e => e !== i)
  //   setTagsarray(filtered)
  // }

  // const handleaddresource =async()=>{
  //   const formData = new FormData()
  //   formData.append("resourcename",rname)
  //   formData.append("resourcetype",rtype)
  //   formData.append("rlink",rlink) 
  //   formData.append("notes",rfile)
  //   formData.append("selectedtopic",selectedtopic._id)

  //  try {
  //    const response = await axios.post("http://localhost:5000/api/v1/admin/addresources",formData,{withCredentials:true})
  //    console.log(response.data.data)
  //    toast.success("Resource Added Successfully")
  //    window.location.reload()
  //  } catch (error) {
  //   toast.error("Something Went Wrong in Adding Resource")
  //  }
  // }
  return (
    <>
    <div className={styles.dashboard}>
      {/* TOP NAVBAR */}
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <span className={styles.brandText}>logo</span>
          </div>
          <div className={styles.profileWrapper}>
  <div
    className={styles.profile}
    onClick={() => setShowDropdown(!showDropdown)}
  >
    <img src="https://i.pravatar.cc/32" alt="" />
    <span>{user?.name?.split(" ")[0]}</span>
  </div>
</div>
        
      </div>

      <div className={styles.shell}>
        {/* SIDEBAR */}
        <div className={styles.sidebarp}>
           <aside className={styles.sidebar}>
          <div className={styles.menuItemActive} data-label="Dashboard" >
          <LayoutDashboard fill="#7F87EF" color="#7F87EF" size={18} /> <span className={styles.menuText}>Dashboard</span>
          </div>
        </aside>
        </div>
       

        {/* MAIN CONTENT */}
          <main className={styles.content}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.headerTitle}>
  <div
    className={styles.mobileToggle}
    onMouseEnter={() => setMobileSidebar(true)}
    onMouseLeave={() => setMobileSidebar(false)}
  >
    ☰
  </div>

  <span><LayoutDashboard fill="#7F87EF" color="#7F87EF"/></span> Dashboard
</div>
      
           
          </div>

          {/* KPI CARDS */}
          <div className={styles.kpiRow}>
            <div className={`${styles.kpiCard} ${styles.topics}`}>
            <img
    src="/folder.jpeg"
    alt=""
    className={styles.kpiGif}
  />


  <div className={styles.kpiOverlay}></div>

  <div className={styles.kpiContent}>
    <div className={styles.kpihead}>
      <Database color="#A2D5FA" size={32} fill="#EBEBFB"/>
      <h2>{dummyLeads?.length}</h2>
    </div>
    <p>Total Leads</p>
    <div className={styles.footer}>
    <span><span className={styles.footernumber}>{dummyLeads?.length}</span><span className={styles.footernumber1}>Leads</span></span> 
    
    </div>
    
  </div>

</div>

            <div className={`${styles.kpiCard} ${styles.topics}`}>

  {/* 🎞️ GIF Background */}
  <img
    src="/resource.jpeg"
    alt=""
    className={styles.kpiGif}
  />

  {/* 🌑 Overlay */}
  <div className={styles.kpiOverlay}></div>

  {/* 📦 Content */}
  <div className={styles.kpiContent}>
    <div className={styles.kpihead}>
      <FolderOpen color="#F977B4" size={32} fill="#FAD8F2"/>
      <h2>{dummyTasks?.length}</h2>
    </div>
    <p>Total Tasks</p>
    <div className={styles.footer}>
    <span><span className={styles.footernumber}>{dummyTasks?.length}</span><span className={styles.footernumber1}>Tasks</span></span> 
   
    </div>
    
  </div>

</div>

            <div className={`${styles.kpiCard} ${styles.favorites}`}>
             <div className={styles.kpiContent}>
    <div className={styles.kpihead}>
      <Heart fill="#FD77A7"size={32} color="#FD77A7"/>
      <h2>{alluser?.length}</h2>
    </div>
    <p>User</p>
    <div className={styles.footer}>
    <span><span className={styles.footernumber}>{alluser?.length}</span><span className={styles.footernumber1}>User</span></span> 
   
    </div>
    
  </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className={styles.activity}>
            <h3>
              <Clock /> All Users
            </h3>
            {alluser.map((item)=>{
              return (
                 <div className={styles.activityItem}>
              <img src="https://i.pravatar.cc/32" alt="" />
              <div className={styles.recent}>
                <p>{item?.name}</p>
                
              </div>
            </div>
              )
            })}
           
            <button className={styles.viewAll}>View All</button>
          </div>
          <div className={styles.activity}>
            <h3>
              <Clock /> All Tasks
            </h3>
            {dummyTasks.map((item)=>{
              return (
                 <div className={styles.activityItem}>
              <img src="https://i.pravatar.cc/32" alt="" />
              <div className={styles.recent}>
                <p>{item?.title}</p>
                
              </div>
            </div>
              )
            })}
          </div>
        </main>
        
      </div>
    <div
  className={`${styles.mobileSidebar} ${
    mobileSidebar ? styles.mobileSidebarOpen : ""
  }`}
  onMouseEnter={() => setMobileSidebar(true)}
  onMouseLeave={() => setMobileSidebar(false)}
>
  <div >
    <LayoutDashboard size={22} fill="#7F87EF" color="#7F87EF" />
  </div>
    </div>

    </div>
    {showDropdown && (
    <div className={styles.dropdown}>
      <div className={styles.dropdownItem} onClick={handleLogout}>
        Logout
      </div>
    </div>
  )}
     {loading && (
      <div className={styles.loadingOverlay}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Creating your account...</p>
      </div>
    )}
    </>
  );
};

export default Dashboard;
