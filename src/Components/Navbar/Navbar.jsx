import { Fragment, useContext , useEffect , useState } from "react" ;
import { Link , NavLink, useNavigate } from "react-router-dom" ;
import logo from "../../Assets/images/fekrah_logo.jpg" ;
import avatar from "../../Assets/images/profile1.png"
import adminAvatar from "../../Assets/images/profile.webp"
import { UserContext } from "../../Context/UserContext.js";
import { CartContext } from "../../Context/CartContext.js";
import profileUrl from "../../Assets/images/profile.webp"

import "./navbar.css"

export default function Navbar({socket}){
   const navigate = useNavigate() ;
   const [scroll , setScroll] = useState(0) ;
   const [click , setClick] = useState(true) ;
   const [notification , setNotification] = useState([])
   const {loggedUser , setLoggedUser , userToken , setUserToken , admin , setAdmin , moderator , setModerator } = useContext(UserContext);
   const {itemCount , setItemCount , getLoggedCart } = useContext(CartContext);




   //& Show a welcome message at different times of the day :
   function getGreeting() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
      return "صباح الخير ☀️";
      } else if (hour >= 12 && hour < 18) {
      return "مساء الخير 🌤";
      } else {
      return "مساء الخير 🌙";
      }
   }




   //& Handle Scroll Display Navbar :
   window.onscroll = function (e){
      if(window.scrollY > scroll){
         e.target.getElementById("navbar").style.top = "-100px"
      }else{
         e.target.getElementById("navbar").style.top = "0px"
      }
      setScroll(window.scrollY)
   }

   
   const handleButtonDisplay = ()=>{
      setClick(!click)
   }

   let removeNotification = (count)=>{
      console.log(count);
      socket.emit("removeNotification" , count)
      
   }



   //& Handle Log Out :
   function logOut(){
      localStorage.clear() ;

      setLoggedUser({}) ;
      setUserToken("") ;
      setAdmin(false) ;
      setModerator(false)
      setItemCount(0)
      navigate("/")
   }



   socket.on("all-Notification" , (data)=>{
      setNotification(data)
      // setNotification((prev)=>[...prev , data])
   })


   useEffect(() => {
      socket.on("getNotification" , (data)=>{
         // setNotification((prev)=>[...prev , data])
         setNotification(data)
      })
   }, [socket])


   return (
      <Fragment>
         <div className="navbar-other-media">
            <nav className=" navbar navbar-expand p-0 main_navbar fixed-top mb-5 pt-1" id="navbar">
                  <div className="container p-0">
                     <Link className="navbar-brand text-black div_logo" to="/home"><img src={logo} alt="logo" className="w-100 h-100 logo" /></Link>

                     {userToken && loggedUser ? <>
                              {admin || moderator? <>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                       <ul className="navbar-nav ms-auto  mb-lg-0 ">
                                          <li className="nav-item">
                                             <NavLink className="nav-link" aria-current="page" to="/home"><i className="fa-solid fa-house xxx"></i> <span >Home</span></NavLink>
                                          </li>
                                          

                                          <li className="nav-item">
                                             <NavLink className="nav-link" to="/dashBoard"><i className="fa-solid fa-address-card"></i><span >DashBoard</span></NavLink>
                                          </li>
                                       </ul>

                                       <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">
                                          <div className="d-inline-block position-relative div_imgCover">
                                             {notification.length ? <span className="position-absolute notification_admin p-1">{notification.length }</span> : ""} 
                                                <i onClick={()=>{handleButtonDisplay()}} className="fa-regular fa-bell fa-xl"></i>
                                                {/* <i onClick={()=>{handleButtonDisplay()}} className="fa-solid fa-bell fa-xl"></i> */}
                                                {/* <img className="imgCover" src={JSON.parse(localStorage.getItem("user")).imgCover || avatar} alt="imgCover" /> */}
                                          </div>
                                          

                                          <Link to="/userProfile">
                                             <img  className="imgCover" src={adminAvatar} alt="imgCover" />
                                          </Link>
                                          <button onClick={()=>{logOut()}} className="btn btn_logOut me-1">LogOut</button>
                                       </ul>
                                    </div>
                              </> : <>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                       <ul className="navbar-nav ms-auto  mb-lg-0 ">
                                          <li className="nav-item">
                                             <NavLink className="nav-link" aria-current="page" to="/home"><i className="fa-solid fa-house xxx"></i> <span >Home</span></NavLink>
                                          </li>
                                          
                                          <li className="nav-item">
                                             <NavLink className="nav-link" to="/price"><i className="fa-solid fa-layer-group"></i><span >price</span></NavLink>
                                          </li>

                                          <li className="nav-item">
                                             <NavLink className="nav-link" to="/allOrderLoggedUser"><i className="fa-solid fa-address-card"></i><span >Orders</span></NavLink>
                                          </li>
                                          <li className="nav-item">
                                             <NavLink className="nav-link" to="/contact"><i className="fa-solid fa-address-card"></i><span >Contact</span></NavLink>
                                          </li>
                                       </ul>

                                       <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">

                                          <li className="nav-item">
                                             <Link className="nav-link  position-relative " to="/cart">
                                             {itemCount ? <span className="notification_cart position-absolute text-black">{itemCount}</span> : ""}
                                                <i className="fa-solid fa-cart-shopping text-black"></i>
                                             </Link>
                                          </li>

                                          <div className="d-inline-block position-relative div_imgCover">
                                                <span className="position-absolute notification p-1">3</span>
                                             <Link to="/userProfile">
                                                {loggedUser?.imgCover ? <img src={loggedUser.imgCover} className="imgCover" alt="imgProfile"/> : <img className="imgCover" src={avatar} alt="imgCover" />}
                                             </Link>
                                          </div>

                                             <button onClick={()=>{logOut()}} className="btn btn_logOut me-1">LogOut</button>


                                          <li className="nav-item">
                                             <Link to="/morePage">
                                                <i class="fa-solid fa-ellipsis-vertical fs-4 text-black"></i>                                                {/* <p className="m-0">المزيد</p>  */}
                                             </Link>
                                          </li>
                                       </ul>
                                    </div>
                              </>}
                        </> : <>
                              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                 <ul className="navbar-nav ms-auto  mb-lg-0 ">
                                    <li className="nav-item">
                                       <NavLink className="nav-link" aria-current="page" to="/home"><i className="fa-solid fa-house xxx"></i> <span >Home</span></NavLink>
                                    </li>
                                    <li className="nav-item">
                                       <NavLink className="nav-link" to="/price"><i className="fa-solid fa-layer-group"></i><span >price</span></NavLink>
                                    </li>

                                    <li className="nav-item">
                                       <NavLink className="nav-link" to="/contact"><i className="fa-solid fa-address-card"></i><span >Contact</span></NavLink>
                                    </li>
                                 </ul>

                                 <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center justify-content-between">
                                    <Link className="btn btn_log m-2" to="/">Log in</Link>
                                 </ul>
                              </div>
                        </>
                     }

                  </div>

                  {notification.length ? <>
                     <div className="notificationAdmin" style={{display:click ? 'none' : "block"}} >
                        <h4 className="p-1 bg-white rounded-1 text-center">Notification</h4>
                        <div className="p-1 bg-white rounded-2  notification-box">
                           {notification.map((ele)=>{
                              return (
                                 // displayNotification(ele)
                                 <p className="my-2  border-bottom border-2 pb-2">
                                    <span className="text-success mx-2">
                                       <i className="fa-solid fa-folder-plus"></i>
                                    </span> 
                                    {ele.type === "addOrder" ? `New Order is Added By ${ele.sender}` : ""} 
                                    <i onClick={()=>{removeNotification(ele.count)}} className="fa-solid fa-xmark text-danger  ms-4 exist_Notification"></i>
                                 </p>
                              )
                           })}
                        </div>
                     </div>
                  </> : <>
                     <div className="notificationAdmin" style={{display:click ? 'none' : "block"}} >
                        <h4 className="p-1 bg-white rounded-1 text-center">Notification</h4>
                        <div className="p-1 bg-white rounded-2">
                           <p className="text-center fw-bold text-danger">Not Found New Notification</p>
                        </div>
                     </div>
                  </>}

            </nav>
         </div>


         <div className="navbar-mobile-bottom">
            {userToken && loggedUser ? <>
                     {admin || moderator? <>

                           {/* Header */}
                           <header className="m-2 pt-2 text-white bg-dark p-2 rounded text-center">
                              <div className='row justify-content-evenly align-items-center'>
                                 <div className='col-3 d-flex justify-content-evenly align-items-center p-0'>
                                    <Link to="#"><i className="fa-regular fa-bell mx-3 fs-3"></i></Link>
                                    <Link to="https://wa.me/201121737333"><i className="fa-regular fa-message  mx-3  fs-3"></i></Link>
                                 </div>

                                 <div className='col-6'>
                                    <div>
                                       <Link  to="/dashBoard">
                                          <h1 className="h2 m-0">Admin Dashboard</h1>
                                       </Link>
                                    </div>


                                    <div>
                                       <p className='m-0'>Welcome</p>
                                       <p className='m-0 text-name'>{loggedUser.name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).slice(0,2).join(" ")}</p>
                                    </div>


                                    <div  className="div-mobile-imgCover">
                                       <Link to="/userProfile">
                                          {
                                             loggedUser?.imgCover ? 
                                                <img src={loggedUser.imgCover} className="w-100" alt="imgProfile"/> 
                                                : 
                                                <img className="w-100" src={profileUrl} alt="imgProfile" />
                                          }
                                       </Link>
                                    </div>
                                 </div>

                                 <div className='col-3 d-flex justify-content-evenly align-items-center p-0'>
                                    <Link  to="#"><i className="fa-solid fa-phone-volume mx-3  fs-3"></i></Link>
                                    <Link  to="#"><i className="fa-solid fa-calendar-days mx-3  fs-3"></i></Link>
                                 </div>
                              </div>
                           </header>

                           {/* Navbar Mobile Position Bottom  */}
                           <nav className="navbar navbar-mobile navbar-dark bg-dark fixed-bottom text-white"> 
                              <div className="container-fluid d-flex justify-content-evenly"> 


                                    <Link to="/dashBoard" className="cart-icon">
                                       <i className="fa-solid fa-chart-line"></i> 
                                       <p className="m-0">Dashboard</p>
                                    </Link>


                                    <Link to="/home" className="cart-icon">
                                       <i className="fa-solid fa-house-user  fs-2 "></i> 
                                       <p className="m-0">Home</p> 
                                    </Link>

                                    <Link to="/morePage" className="cart-icon">
                                       <i className="fa-solid fa-ellipsis "></i>
                                       <p className="m-0">More</p> 
                                    </Link>

                              </div> 
                           </nav>
                     </> : <>

                           {/* Header */}
                           <header className="m-2 pt-2 text-white bg-dark p-2 rounded text-center">
                              <div className='row justify-content-evenly align-items-center'>
                                 <div className='col-3 d-flex justify-content-evenly align-items-center p-0'>
                                    <Link to="#"><i className="fa-regular fa-bell mx-3 fs-3"></i></Link>
                                    <Link to="https://wa.me/201121737333"><i className="fa-regular fa-message  mx-3  fs-3"></i></Link>
                                 </div>

                                 <div className='col-6'>
                                    <div>
                                       <Link  to="/home">
                                          <h1 className="h2 m-0">FEKRAH MEDICAL</h1>
                                       </Link>
                                    </div>


                                    <div>
                                       <p className='m-0'>{getGreeting()}</p>
                                       <p className='m-0 text-name'>{loggedUser.name.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).slice(0,2).join(" ")}</p>
                                    </div>


                                    <div  className="div-mobile-imgCover">
                                       <Link to="/userProfile">
                                          {
                                             loggedUser?.imgCover ? 
                                                <img src={loggedUser.imgCover} className="w-100" alt="imgProfile"/> 
                                                : 
                                                <img className="w-100" src={profileUrl} alt="imgProfile" />
                                          }
                                       </Link>
                                    </div>
                                 </div>

                                 <div className='col-3 d-flex justify-content-evenly align-items-center p-0'>
                                    <Link  to="#"><i className="fa-solid fa-phone-volume mx-3  fs-3"></i></Link>
                                    <Link  to="#"><i className="fa-solid fa-calendar-days mx-3  fs-3"></i></Link>
                                 </div>
                              </div>
                           </header>



                           {/* Navbar Mobile Position Bottom  */}
                           <nav className="navbar navbar-mobile navbar-dark bg-dark fixed-bottom text-white"> 
                              <div className="container-fluid d-flex justify-content-evenly"> 

                                    <Link to="#" className="cart-icon">
                                       <i className="fa-solid fa-gift"></i> 
                                       <p className="m-0">العروض</p> 
                                    </Link>


                                    <Link to="/allOrderLoggedUser" className="cart-icon">
                                       <i className="fa-solid fa-truck"></i> 
                                       <p className="m-0">الاوردرات</p> 
                                    </Link>




                                    <Link to="/home" className="cart-icon">
                                       <i className="fa-solid fa-house-user  fs-2 "></i> 
                                       <p className="m-0">الرئيسية</p> 
                                    </Link>


                                    <Link to="/cart" className="cart-icon">
                                       <i className="fa-solid fa-cart-plus "></i> 
                                       <p className="m-0">السلة</p>
                                    </Link>


                                    <Link to="/morePage" className="cart-icon">
                                       <i className="fa-solid fa-ellipsis "></i>
                                       <p className="m-0">المزيد</p> 
                                    </Link>

                              </div> 
                           </nav>
                     </>}
               </> : ""
            }
         </div>
      </Fragment>
   )
}