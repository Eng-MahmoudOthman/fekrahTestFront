import React, { Fragment, useContext, useState } from 'react'
import { useFormik } from "formik" ;
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from 'sweetalert2';

import { UserContext } from "../../Context/UserContext.js";
import { CartContext } from "../../Context/CartContext.js";
// import Swal from 'sweetalert2';
import "./UpdateUserProfile.css" ;






export default function UpdateUserProfile() {
   const navigate = useNavigate() ;

   const {setRole , setLoggedUser  , setUserToken ,loggedUser , setAdmin  , setModerator } = useContext(UserContext)
   const { setItemCount , getLoggedCart } = useContext(CartContext)
   const [showPassword, setShowPassword] = useState(false);


   const header = {
      token:`${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("token") }`
   }

   async function submitUpdated(values){
      let {data} = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/users` , values ,  {headers:header} )
      .catch((error)=>{
         toast.error(error.response.data.message)
         Swal.fire({
            title:"Failed Updated"  ,
            text: `Can't Updated User Information Because : ${error.response.data.message}` ,   
            icon: "error"
         });  
      })

      if(data.message === "success"){
         Swal.fire({
            title:"Successfully"  ,
            text: "Successfully Updated User Information" ,   
            icon: "success"
         });        
         
         localStorage.setItem("user" , JSON.stringify(data.updateUser))
         setLoggedUser(data.updateUser) ;
         navigate("/userProfile") ;
      }
   }

   

   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").trim() ,
      email:Yup.string().email().trim().optional() ,
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/).trim() ,
      birthDay:Yup.string().trim() ,
   })


   let formik = useFormik({
      initialValues:{
         name:loggedUser.name ,
         phone:loggedUser.phone ,
         email:loggedUser.email ,
         birthDay:"" ,
      } , validationSchema , 
      onSubmit:submitUpdated
   })


   return (
      <Fragment>
         <div className='container updateUserProfile-container'>
            <div className=" w-100 p-5">
               <h1 className="main-header">تعديل ملفى الشخصى</h1>

               <p className="updateUserProfile-sub-title text-center">يرجى إدخال المعلومات بالطريقة الصحيحة</p>

               <form action="" onSubmit={formik.handleSubmit}>

                  <div className="my-4 position-relative">
                     <i className="fas fa-user icon-input-field"></i>
                     <label htmlFor="name" className="form-label not-required ">إدخل اسم المستخدم </label>
                     <input type="text" 
                        value={formik.values.name}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control " id="name"  
                        name="name" 
                        placeholder="name@example.com" />
                     {
                        formik.errors.name  && formik.touched.name?
                           <div className="text-danger m-0 p-0">{formik.errors.name}</div> 
                           : 
                           <p className="text-success m-0 p-0">Enter Correct Information Please !</p>
                     }
                  </div>
                  

                  <div className="my-4 position-relative">
                     <i className="fa-solid fa-envelope-circle-check icon-input-field"></i>
                     <label htmlFor="email" className="form-label not-required ">Enter User Email</label>
                     <input type="email" 
                        value={formik.values.email}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="email"  
                        name="email" 
                        placeholder="name@example.com" />
                     {
                     formik.errors.email  && formik.touched.email?
                        <div className="text-danger m-0 p-0">{formik.errors.email}</div> 
                        : 
                        <p className="text-success m-0 p-0">Enter Correct Information Please !</p>
                     }
                  </div>



                  <div className="my-4 position-relative">
                     <i className="fa-solid fa-mobile-screen-button icon-input-field"></i>
                     <label htmlFor="phone" className="form-label not-required">Enter User Phone</label>
                     {/* <input type="tel"  */}
                     <input type="text" 
                        value={formik.values.phone}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="phone"  
                        name="phone" 
                        placeholder="01X XXX XXX XX" />
                     {
                     formik.errors.phone && formik.touched.phone?
                        <div className="text-danger m-0 p-0">{formik.errors.phone}</div> 
                        : 
                        <p className="text-success m-0 p-0">Enter Correct Information Please !</p>
                     }
                  </div>

                  
                  <div className="my-4 position-relative">
                     <i className="fa-solid fa-cake-candles icon-input-field"></i>
                     <label htmlFor="birthDay" className="form-label not-required ">Enter User birthDay</label>
                     {/* <input type="tel"  */}
                     <input type="date" 
                        value={formik.values.birthDay}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="birthDay"  
                        name="birthDay" 
                        placeholder="xxxx-xx-xx" />
                     {
                     formik.errors.birthDay && formik.touched.birthDay?
                        <div className="text-danger m-0 p-0">{formik.errors.birthDay}</div> 
                        : 
                        <p className="text-success m-0 p-0">Enter Correct Information Please !</p>
                     }
                  </div>

                  <div className="d-grid gap-2 col-8 mx-auto">
                     <button  type="submit" className="btn bg-main text-white  mt-2">Login</button>
                  </div>
               </form>
            </div>
         </div>
      </Fragment>
   )
}


