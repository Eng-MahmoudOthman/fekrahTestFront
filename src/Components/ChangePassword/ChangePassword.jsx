import React , { Fragment, useContext , useState } from 'react';
import { useFormik } from "formik" ;
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.js";
import { CartContext } from "../../Context/CartContext.js";
import Swal from 'sweetalert2';
import "./changePassword.css"



export default function ChangePassword() {
      let navigate = useNavigate()

      const [error , setError] = useState(null)
      const [loading , setLoading] = useState(false)
      const {setRole , setLoggedUser  , setUserToken ,loggedUser , setAdmin  , setModerator } = useContext(UserContext)
      const { setItemCount , getLoggedCart } = useContext(CartContext)
      const [showPassword, setShowPassword] = useState(false);
   
      const header = {
         token:`${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("token") }`
      }
   

   
      //& Handle Log Out :
      function logOut(){
         localStorage.clear() ;

         setLoggedUser({}) ;
         setUserToken("") ;
         setAdmin(false) ;
         setModerator(false)
         navigate("/")
      }


      //& Handle Phone Empty Or Email Empty :
      async function submitChangePassword(values){
         setLoading(true)
         await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/changePassword` , values ,  {headers:header})
         .then(({data})=>{
            setLoading(false)
            if(data.message === "success"){
               Swal.fire({
                  title: "تسجيل خروج إجبارى !",
                  text: `يرجى العلم بأنة عند تغيير كلمة المرور سيتم تسجيل خروج من الموقع إجبارى ويتوجب عليك تسجيل دخول مرة أخرى`,
                  icon: "error",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Save Password"
               }).then((result) => {
                  if (result.isConfirmed) {
                     Swal.fire({
                        title: "Change Password Successfully ",
                        text: "Change Password Successfully, Please Try Login !",
                        icon: "success"
                     });
                     logOut()
                  }
               })
            }
         })
         .catch((error)=>{
            setError(error.response.data.message)
            toast.error(error.response.data.message)
            setLoading(false)
         })
      }

   
      let validationSchema = Yup.object({
         oldPassword:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{7,}$/ , "should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
         password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{7,}$/ , "should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
         rePassword:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{7,}$/ , "should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      })
   
   
      let formik = useFormik({
         initialValues:{
            oldPassword:"" ,
            password:"" ,
            rePassword:"" ,
         } , validationSchema , 
         onSubmit:submitChangePassword
      })
   
   return (
      <Fragment>
         <div className='container changePassword-container'>
            <div className="row mx-1">
               <div className=" col-md-8 m-auto">
                  <h1 className="main-header">تغيير كلمة المرور</h1>
                  {/* <p className="sub-title text-center">Change Password</p> */}
                  <form action="" onSubmit={formik.handleSubmit}>

                     {error?<p className="alert alert-danger p-1 px-2 m-0 mt-2">{error}</p> :""}

                     <div className="mb-4 position-relative">
                        <i className="fas fa-lock icon-input-field"></i>
                        <label htmlFor="oldPassword" className="form-label required">Enter Old Password </label>
                        <input  type={showPassword ? "text" : "password"}
                           value={formik.values.oldPassword}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="oldPassword"  
                           name="oldPassword" 
                           required
                           placeholder="ادخل كلمة المرور القديمة" 

                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                           />
                        {
                           formik.errors.oldPassword && formik.touched.oldPassword?
                              <p className="text-danger m-0 p-0">{formik.errors.oldPassword}</p> 
                              : 
                              <p className="text-success ms-2 p-0">Write The  Old Password Here Please !</p>
                        }
                        <i className="fas fa-eye toggle-password"></i>


                        {showPassword ? (
                           <i className="fas fa-eye toggle-password" onClick={() => setShowPassword(false)}></i>
                        ) : (
                           <i className="fas fa-eye-slash toggle-password" onClick={() => setShowPassword(true)}></i>
                        )}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fas fa-lock icon-input-field"></i>
                        <label htmlFor="password" className="form-label required">Enter New Password </label>
                        <input  type={showPassword ? "text" : "password"}
                           value={formik.values.password}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="password"  
                           name="password" 
                           required
                           placeholder="ادخل كلمة المرور الجديدة"

                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                           />
                        {
                           formik.errors.password && formik.touched.password?
                              <p className="text-danger m-0 p-0">{formik.errors.password}</p> 
                              : 
                              <p className="text-success ms-2 p-0">More 8 Character and Special Character !</p>
                        }
                     </div>


                     <div className="my-4 position-relative">
                     <i className="fa-solid fa-unlock-keyhole  icon-input-field"></i>
                        <label htmlFor="rePassword" className="form-label required">Enter Re-Password </label>
                        <input  type={showPassword ? "text" : "password"}
                           value={formik.values.rePassword}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="rePassword"  
                           name="rePassword" 
                           required
                           placeholder="إعادة ادخال كلمة المرور الجديدة" 

                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                        />
                        {
                           formik.errors.rePassword && formik.touched.rePassword?
                              <p className="text-danger m-0 p-0">{formik.errors.rePassword}</p> 
                              : 
                              <p className="text-success ms-2 p-0">More 8 Character and Special Character !</p>
                        }
                     </div>

                     <div className="d-grid gap-2 col-8 mx-auto">
                        {loading ? 
                              <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                           : 
                              <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white  mt-2">
                                 <i className="fa-solid fa-unlock-keyhole mx-4"></i>   تغيير كلمة المرور 
                              </button>
                        }
                     </div>

                  </form>
               </div>
            </div>
         </div>
      </Fragment>
   )
}
