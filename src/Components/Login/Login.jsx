import { useFormik } from "formik" ;
import { Fragment, useContext , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.js";
import { CartContext } from "../../Context/CartContext.js";
import Swal from 'sweetalert2';
import "./login.css"

export default function Login({socket}){

   let navigate = useNavigate()
   const [error , setError] = useState(null)
   const [loading , setLoading] = useState(false)
   const {setRole , setLoggedUser  , setUserToken ,loggedUser , setAdmin  , setModerator } = useContext(UserContext)
   const { setItemCount , getLoggedCart } = useContext(CartContext)
   const [showPassword, setShowPassword] = useState(false);



   //& Decoded Token :
   function decodedToken(){
      const token =  localStorage.getItem('token'); 
      let decoded = jwtDecode(token);
      return decoded.role
   }





   //& Handle Phone Empty Or Email Empty :
   async function submitLogin(values){
      setLoading(true)
      let {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signIn` , values)
      .catch((error)=>{
         setError(error.response.data.message)
         toast.error(error.response.data.message)
         setLoading(false)
      })
      
      //^ Check Login Success User :
         if(data?.message === "success"){
            setLoading(false)
            //& save Token In Local Storage And Save Token in Use Context :
            toast.success("Success")
            localStorage.setItem("token" , data.token) ;
            localStorage.setItem("user" , JSON.stringify(data.user))

            setUserToken(data.token) ;
            setLoggedUser(data.user) ;
            
            //& Get Item In Logged User Cart : 
            getLoggedCart() ;

            //& Set Role :
            setRole(decodedToken());


            //& Check Admin Or Or Moderator Or User :
            if( decodedToken() === "admin"){
               setAdmin(true)
            }else if (decodedToken() === "moderator"){
               setModerator(true)
            }

            navigate("/home") ;
            setTimeout(() => {
               logOut()
            }, (60*60*2*1000));  // After 2 hours  logout
                                 // 60*10*1000 = 600,000= 10 minute
                                 // 60*20*2*1000 = 2400,000= 1/3 hours
                                 // 60*60*1000 = 3600,000= 1 hours  
                                 // 60*60*2*1000 = 7200,000= 2 hours  
         }else{
            navigate("/") ;
         }
      }



   //& Handle Log Out :
   function logOut(){
      console.log("LogOut From inner function logout");
      
      localStorage.clear() ;
      setLoggedUser({}) ;
      setUserToken("") ;
      setAdmin(false) ;
      setModerator(false)
      setItemCount(0)
      navigate("/")
      Swal.fire({
         title:"Session Expired !" ,
         text: "Session Expired .Please Try Log in Again !!" ,   
         icon: "error"
      });
   }

   let validationSchema = Yup.object({
      email:Yup.string().email().required().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{7,}$/ , "should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
   })


   let formik = useFormik({
      initialValues:{
         email:"" ,
         password:"" ,
      } , validationSchema , 
      onSubmit:submitLogin
   })

   return (
      <Fragment>
         <div className="login-container">
            <div className="row">
               <div className="col-lg-6">
                  <div className="logoImage"></div>
               </div>

               <div className="col-lg-6">
                  <div className=" w-100 p-5">
                  <h1 className="main-header">تسجيل الدخول</h1>

                  <p className="login-sub-title text-center">Enter your email and password to sign in</p>

                  <form action="" onSubmit={formik.handleSubmit}>

                     {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

                     <div className="my-4 position-relative">
                        <i className="fas fa-user icon-input-field"></i>
                        <label htmlFor="email" className="form-label required">Enter User Email </label>
                        <input type="email" 
                           value={formik.values.email}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control " id="email"  
                           name="email" 
                           required
                           placeholder="name@example.com" />
                        {
                           formik.errors.email  && formik.touched.email?
                              <div className="text-danger m-0 p-0">{formik.errors.email}</div> 
                              : 
                              <p className="text-success m-0 p-0">Enter Good Information Please !</p>
                        }
                     </div>

                     <div className="my-4 position-relative">
                        <i className="fas fa-lock icon-input-field"></i>
                        <label htmlFor="password" className="form-label required">Enter User Password </label>
                        <input  type={showPassword ? "text" : "password"}
                           value={formik.values.password}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control" id="password"  
                           name="password" 
                           required
                           placeholder="Enter Password" />
                        {
                           formik.errors.password && formik.touched.password?
                              <p className="text-danger m-0 p-0">{formik.errors.password}</p> 
                              : 
                              <p className="text-success m-0 p-0">Enter Good Information Please !</p>
                        }
                        <i className="fas fa-eye toggle-password"></i>


                        {showPassword ? (
                           <i className="fas fa-eye toggle-password" onClick={() => setShowPassword(false)}></i>
                        ) : (
                           <i className="fas fa-eye-slash toggle-password" onClick={() => setShowPassword(true)}></i>
                        )}
                     </div>

                     <div className="d-grid gap-2 col-8 mx-auto">
                        {loading ? 
                              <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                           : 
                              <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white  mt-2">Login</button>
                        }
                        <p className="register-text text-center mt-1">Don't have an account?<Link className="m-1 text-primary" to="/register" >  Sign up </Link></p>
                     </div>

                  </form>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
} 