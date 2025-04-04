import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext.js'
import "./userProfile.css"
import logo from "../../Assets/images/profile1.png"
import Swal from 'sweetalert2'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function UserProfile() {
   const {role , loggedUser} = useContext(UserContext)

   let showImageProfile = (image)=>{
      Swal.fire({
         imageUrl:image === 1 ? loggedUser.imgCover : logo,
         imageHeight: 460,
         imageAlt: "A tall image"
      });
   }

   return (
      <Fragment>
         <div className="container mt-5 homeDashboard">
            <h1 className='main-header'>Profile</h1>
            <div className='under-header'></div>
               <div className='imgCoverProfile m-auto '>
                  {loggedUser?.imgCover ? <img onClick={()=>{showImageProfile(1)}} src={loggedUser.imgCover} className='' alt="Cover"/> : <img onClick={()=>{showImageProfile()}} src={logo} className='' alt="Cover"/>}
               </div>
                  <div className='text-center my-2'>
                     <Link to="/ChangeUserImage" title='اضغط هنا لتغيير الصورة الشخصية' className='btn btn-sm bg-main'>تغيير الصورة الشخصية<i className="fa-solid fa-camera-rotate ms-2"></i></Link>
                  </div>
               
               <p className='fs-4'>User Name : {loggedUser.name}</p>
               <p className='fs-4'>User Email : {loggedUser.email}</p>
               <p className='fs-4'>User Age : {loggedUser.age}</p>
               <p className='fs-4'>User BirthDay : {loggedUser.birthDay?.split("").slice(0 , 10).join("")}</p>
               <p className='fs-4'>User Phone : {loggedUser.phone}</p>
               {role === "admin" || role === "moderator" ? <p className='fs-4'>User Role : {loggedUser.role}</p> :""}
         </div>
      </Fragment>
   )
}
