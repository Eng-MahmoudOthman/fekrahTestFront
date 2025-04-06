import axios from "axios";
import { useFormik } from "formik" ;
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import "./register.css"


export default function Register(){

   let navigate = useNavigate()
   const [error , setError] = useState(null)
   const [loading , setLoading] = useState(false)
   const [showPassword, setShowPassword] = useState(false);




   async function submitRegister(values){
      setLoading(true)
      let {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signUp` , values)
      .catch((error)=>{
         setError(error.response.data.message)
         toast.error(error.response.data.message)
         setLoading(false)
      })

      if(data.message === "success"){
         setLoading(false)
         navigate("/")
         console.log(data.token);
         localStorage.setItem("token" , data.token)
      }
   }


   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      email:Yup.string().email().required().trim() ,
      phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/).trim() ,
      birthDay:Yup.string().required().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      rePassword:Yup.string().oneOf([Yup.ref("password")]  , "rePassword Should be Same Password").required() ,
   })


   let formik = useFormik({
      initialValues:{
         name:"" ,
         phone:"" ,
         email:"" ,
         birthDay:"" ,
         password:"" ,
         rePassword:"" 
      } , validationSchema , 
      onSubmit:submitRegister
   })


   return (
      <Fragment>
         <div className="register-container p-3 m-auto mt-5">
            <h1 className="main-header">Register Now</h1>
            <p className="sub-title text-center">Enter Good Information Please !</p>


            <div className="row">
               <div className="col-md-8 offset-md-2">
                  <form action="" onSubmit={formik.handleSubmit}>
                     {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}
                     <div className="my-4 position-relative">
                        <i className="fas fa-user icon-input-field"></i>
                        <label htmlFor="name" className="form-label required">Enter User Name</label>
                        <input type="text" 
                           value={formik.values.name}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="name"  
                           name="name" 
                           required
                           placeholder="Mahmoud Othman" />
                        {formik.errors.name && formik.touched.name?<div className="text-danger m-0 p-0">{formik.errors.name}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-envelope-circle-check icon-input-field"></i>
                        <label htmlFor="email" className="form-label required">Enter User Email</label>
                        <input type="email" 
                           value={formik.values.email}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="email"  
                           name="email" 
                           required
                           placeholder="name@example.com" />
                        {formik.errors.email  && formik.touched.email?<div className="text-danger m-0 p-0">{formik.errors.email}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-mobile-screen-button icon-input-field"></i>
                        <label htmlFor="phone" className="form-label required">Enter User Phone</label>
                        {/* <input type="tel"  */}
                        <input type="text" 
                           value={formik.values.phone}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="phone"  
                           name="phone" 
                           required
                           placeholder="01X XXX XXX XX" />
                        {formik.errors.phone && formik.touched.phone?<div className="text-danger m-0 p-0">{formik.errors.phone}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-cake-candles icon-input-field"></i>
                        <label htmlFor="birthDay" className="form-label required">Enter User birthDay</label>
                        {/* <input type="tel"  */}
                        <input type="date" 
                           value={formik.values.birthDay}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="birthDay"  
                           name="birthDay" 
                           required
                           placeholder="xxxx-xx-xx" />
                        {formik.errors.birthDay && formik.touched.birthDay?<div className="text-danger m-0 p-0">{formik.errors.birthDay}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fas fa-lock icon-input-field"></i>
                        <label htmlFor="password" className="form-label required">Enter User Password</label>
                        <input type={showPassword ? "text" : "password"} 
                           value={formik.values.password}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="password"  
                           name="password" 
                           required
                           placeholder="Enter Password" 
                           
                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                           />
                        {formik.errors.password && formik.touched.password?<div className="text-danger m-0 p-0">{formik.errors.password}</div> :""}
                        <i className="fas fa-eye toggle-password"></i>

                        {showPassword ? (
                              <i className="fas fa-eye toggle-password" onClick={() => setShowPassword(false)}></i>
                           ) : (
                              <i className="fas fa-eye-slash toggle-password" onClick={() => setShowPassword(true)}></i>
                           )
                        }
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-unlock-keyhole  icon-input-field"></i>
                        <label htmlFor="rePassword" className="form-label required">Enter User rePassword</label>
                        <input type={showPassword ? "text" : "password"} 
                           value={formik.values.rePassword}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="rePassword"  
                           name="rePassword" 
                           required
                           placeholder="Enter rePassword" 
                           
                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                           />
                        {formik.errors.rePassword && formik.touched.rePassword?<div className="text-danger m-0 p-0">{formik.errors.rePassword}</div> :""}
                     </div>



                     <div className="d-grid gap-2 col-8 mx-auto">
                        {loading ? 
                              <button className="btn bg-main text-white mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                           : 
                              <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">Register</button>
                        }
                        <p className="login-text text-center mt-1">Don't have an account?<Link className="m-2 main-color" to="/" >  Log in </Link></p>
                     </div>

                  </form>
               </div>
            </div>

         </div>
      </Fragment>
   )
} 