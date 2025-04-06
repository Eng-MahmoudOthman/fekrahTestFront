import { useFormik } from "formik" ;
import { Fragment , useState } from "react";
import {useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import axios from "axios";
import Swal from 'sweetalert2';
import "./forgetPassword.css" ;





export default function ForgetPassword() {

   const [email , setEmail] = useState("")
   const [resetToken , setResetToken] = useState("") ;
   const [step , setStep] = useState("email") ;
   const [loading , setLoading] = useState(false)
   const [error , setError] = useState(null) ;
   const [showPassword, setShowPassword] = useState(false);
   let navigate = useNavigate() ;









      //& Send Email To Server And Send Server OTP To Email :
      async function sendEmail(values){
         setLoading(true)
         await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/request-reset` , values)
         .then(({data})=>{
            setEmail(values.email)
            setStep("otp")
            setLoading(false)
         })
         .catch((error)=>{
            setError(error.response.data.message)
            toast.error(error.response.data.message)
            setLoading(false)
         })
      }
      let validationSchemaEmail = Yup.object({
         email:Yup.string().email("من فضلك أدخل بريد إلكتروني صالح").required("الإيميل مطلوب").trim() ,
      })
      let formikEmail = useFormik({
         initialValues:{
            email:"" ,
         } , validationSchemaEmail , 
         onSubmit:sendEmail
      })






      async function verifyOTP (values){
         setLoading(true)
         values.email = email
         await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/verify-otp` , values)
         .then(({data})=>{
            setResetToken(data.resetToken)
            setStep("reset")
            setLoading(false)
         })
         .catch((error)=>{
            setError(error.response.data.message)
            toast.error(error.response.data.message)
            setLoading(false)
         })
      } ;
      let validationSchemaOTP = Yup.object({
         OTP:Yup.string().email().required().trim() ,
      })
      let formikOTP = useFormik({
         initialValues:{
            OTP:"" ,
         } , validationSchemaOTP , 
         onSubmit:verifyOTP
      })









      async function newPassword(values){
         setLoading(true)
         values.resetToken = resetToken
         await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/reset-password` , values)
         .then(({data})=>{
            Swal.fire({
               title: "Password Reset Successfully",
               text: `New Password:${data.newPassword}`,
               icon: "success"
            });
            navigate("/");
            setLoading(false)
         })
         .catch((error)=>{
            setError(error.response.data.message)
            toast.error(error.response.data.message)
            setLoading(false)
         })
      } ;
      let validationSchemaReset = Yup.object({
         newPassword:Yup.string().email().required().trim() ,
      })
      let formikReset  = useFormik({
         initialValues:{
            newPassword:"" ,
         } , validationSchemaReset , 
         onSubmit:newPassword
      })

   
   







   

   return (
      <Fragment>
         <div className='container ForgetPassword-container'>
            <div>
               <h1 className="mb-0 mt-4 main-color">Password Reset</h1>
               <p className="my-0 ">Provide the email address associated with your account to recover your password.</p>
               <p className="fs-5 mb-3 fw-bold">Step {step === "email" ? <span className="main-color">1</span> : step === "otp" ? <span className="main-color">2</span> : <span className="main-color">3</span>} of 3</p>
            </div>



            {step === "email"? 
                  <div className="email">
                     <div>
                        <form action="" onSubmit={formikEmail.handleSubmit}>
   
                           {error?<p className="text-danger">{error}</p> :""}
   
                           <div className="my-4 position-relative">
                              <i className="fas fa-user icon-input-field"></i>
                              <label htmlFor="email" className="form-label required">Enter User Email </label>
                              <input type="email" 
                                 value={formikEmail.values.email}
                                 onChange={formikEmail.handleChange} 
                                 onBlur={formikEmail.handleBlur}
                                 className="form-control " id="email"  
                                 name="email" 
                                 required
                                 placeholder="name@example.com" />
                              {
                                 formikEmail.errors.email  && formikEmail.touched.email?
                                    <div className="text-danger m-0 p-0">{formikEmail.errors.email}</div> 
                                    : 
                                    <p className="text-success m-0 p-0">Enter Good Information Please !</p>
                              }
                           </div>
   
                           <div className="d-grid gap-2 col-8 mx-auto">
                              {loading ? 
                                    <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                                 : 
                                    <button disabled={!(formikEmail.isValid && formikEmail.dirty)} type="submit" className="btn bg-main text-white  mt-2">Send OTP to email</button>
                              }
                           </div>
   
                        </form>
                     </div>
                  </div>
               : 
               ""
            }





            {step === "otp" ? 
                  <div className="otp">
                     <div>
                        <form action="" onSubmit={formikOTP.handleSubmit}>
   
                           {error?<p className="text-danger">{error}</p> :""}
   
                           <div className="my-4 position-relative">
                              <i className="fas fa-user icon-input-field"></i>
                              <label htmlFor="OTP" className="form-label required">Enter OTP </label>
                              <input type="text" 
                                 value={formikOTP.values.OTP}
                                 onChange={formikOTP.handleChange} 
                                 onBlur={formikOTP.handleBlur}
                                 className="form-control " id="OTP"  
                                 name="OTP" 
                                 required
                                 placeholder="xx xx xx" />
                              {
                                 formikOTP.errors.OTP  && formikOTP.touched.OTP?
                                    <div className="text-danger m-0 p-0">{formikOTP.errors.OTP}</div> 
                                    : 
                                    <p className="text-success m-0 p-0">Enter Good Information Please !</p>
                              }
                           </div>
   
                           <div className="d-grid gap-2 col-8 mx-auto">
                              {loading ? 
                                    <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                                 : 
                                    <button disabled={!(formikOTP.isValid && formikOTP.dirty)} type="submit" className="btn bg-main text-white  mt-2">Verify OTP</button>
                              }
                           </div>
   
                        </form>
                     </div>
                  </div>
               : 
               " "
            }




            {step === "reset" ? 
                  <div className="reset">
                     <div>
                        <form action="" onSubmit={formikReset.handleSubmit}>

                           {error?<p className="text-danger">{error}</p> :""}

                           <div className="my-4 position-relative">
                              <i className="fas fa-lock icon-input-field"></i>
                              <label htmlFor="newPassword" className="form-label required">Enter New Password </label>
                              <input  type={showPassword ? "text" : "password"}
                                 value={formikReset.values.newPassword}
                                 onChange={formikReset.handleChange} 
                                 onBlur={formikReset.handleBlur}
                                 className="form-control" id="newPassword"  
                                 name="newPassword" 
                                 required
                                 placeholder="Enter New Password" 

                                 /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                                 onCopy={(e) => e.preventDefault()}
                                 onPaste={(e) => e.preventDefault()}
                                 onCut={(e) => e.preventDefault()}
                                 onContextMenu={(e) => e.preventDefault()}
                                 />
                              {
                                 formikReset.errors.newPassword && formikReset.touched.newPassword?
                                    <p className="text-danger m-0 p-0">{formikReset.errors.newPassword}</p> 
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
                                    <button disabled={!(formikReset.isValid && formikReset.dirty)} type="submit" className="btn bg-main text-white  mt-2">New Password</button>
                              }
                           </div>

                        </form>
                     </div>
                  </div>
               : 
               " "
            }


         </div>
      </Fragment>
   )
}


















































// import { useFormik } from "formik" ;
// import { Fragment, useContext , useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import * as Yup from 'yup';
// import { jwtDecode } from "jwt-decode";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { UserContext } from "../../Context/UserContext.js";
// import { CartContext } from "../../Context/CartContext.js";
// import Swal from 'sweetalert2';
// import "./forgetPassword.css" ;





// export default function ForgetPassword() {

//       let navigate = useNavigate()
//       const [error , setError] = useState(null)
//       const [showSendEmail , setShowSendEmail] = useState(true) ;
//       const [loading , setLoading] = useState(false)
//       // const {setRole , setLoggedUser  , setUserToken ,loggedUser , setAdmin  , setModerator } = useContext(UserContext)
//       // const { setItemCount , getLoggedCart } = useContext(CartContext)



//       async function sendEmailToServer(values){
//          console.log(values);
//          setShowSendEmail(false)
//       } ;
//       async function ForgetPassword(values){
//          console.log(values);
//       } ;



//       // //& Handle Phone Empty Or Email Empty :
//       // async function ForgetPassword(values){
//       //    // setLoading(true)
//       //    // let {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signIn` , values)
//       //    // .catch((error)=>{
//       //    //    setError(error.response.data.message)
//       //    //    toast.error(error.response.data.message)
//       //    //    setLoading(false)
//       //    // })
         
//       //    // //^ Check Login Success User :
//       //    //    if(data?.message === "success"){
//       //    //       setLoading(false)
//       //    //       //& save Token In Local Storage And Save Token in Use Context :
//       //    //       toast.success("Success")
//       //    //       localStorage.setItem("token" , data.token) ;
//       //    //       localStorage.setItem("user" , JSON.stringify(data.user))
   
//       //    //       setUserToken(data.token) ;
//       //    //       setLoggedUser(data.user) ;
               
//       //    //       //& Get Item In Logged User Cart : 
//       //    //       getLoggedCart() ;
   
//       //    //       //& Set Role :
//       //    //       setRole(decodedToken());
   
   
//       //    //       //& Check Admin Or Or Moderator Or User :
//       //    //       if( decodedToken() === "admin"){
//       //    //          setAdmin(true)
//       //    //       }else if (decodedToken() === "moderator"){
//       //    //          setModerator(true)
//       //    //       }
   
//       //    //       navigate("/home") ;
//       //    //       setTimeout(() => {
//       //    //          logOut()
//       //    //       }, (60*60*2*1000));  // After 2 hours  logout
//       //    //                            // 60*10*1000 = 600,000= 10 minute
//       //    //                            // 60*20*2*1000 = 2400,000= 1/3 hours
//       //    //                            // 60*60*1000 = 3600,000= 1 hours  
//       //    //                            // 60*60*2*1000 = 7200,000= 2 hours  
//       //    //    }else{
//       //    //       navigate("/") ;
//       //    //    }
//       //    console.log(values);
         
//       //    }
   
   
//       let validationSchemaEmail = Yup.object({
//          email:Yup.string().email().required().trim() ,
//       })

//       let validationSchemaOTP = Yup.object({
//          email:Yup.string().email().required().trim() ,
//       })
   
   
//       let formikEmail = useFormik({
//          initialValues:{
//             email:"" ,
//          } , validationSchemaEmail , 
//          onSubmit:sendEmailToServer
//       })

      
//       let formikOTP = useFormik({
//          initialValues:{
//             OTP:"" ,
//          } , validationSchemaOTP , 
//          onSubmit:ForgetPassword
//       })

   

//    return (
//       <Fragment>
//          <div className='container ForgetPassword-container'>
//                <div>
//                   <h1>Password Reset</h1>
//                   <p>Provide the email address associated with your account to recover your password.</p>
//                </div>

//                {showSendEmail ? 
//                      <div className="send-email">
//                         <div>
//                            <form action="" onSubmit={formikEmail.handleSubmit}>
      
//                               {error?<p className="text-danger">{error}</p> :""}
      
//                               <div className="my-4 position-relative">
//                                  <i className="fas fa-user icon-input-field"></i>
//                                  <label htmlFor="email" className="form-label required">Enter User Email </label>
//                                  <input type="email" 
//                                     value={formikEmail.values.email}
//                                     onChange={formikEmail.handleChange} 
//                                     onBlur={formikEmail.handleBlur}
//                                     className="form-control " id="email"  
//                                     name="email" 
//                                     required
//                                     placeholder="name@example.com" />
//                                  {
//                                     formikEmail.errors.email  && formikEmail.touched.email?
//                                        <div className="text-danger m-0 p-0">{formikEmail.errors.email}</div> 
//                                        : 
//                                        <p className="text-success m-0 p-0">Enter Good Information Please !</p>
//                                  }
//                               </div>
      
//                               <div className="d-grid gap-2 col-8 mx-auto">
//                                  {loading ? 
//                                        <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
//                                     : 
//                                        <button disabled={!(formikEmail.isValid && formikEmail.dirty)} type="submit" className="btn bg-main text-white  mt-2">Send OTP to email</button>
//                                  }
//                               </div>
      
//                            </form>
//                         </div>
//                      </div>
//                   :
//                      <div className="send-otp">
//                         <div>
//                            <form action="" onSubmit={formikOTP.handleSubmit}>

//                               {error?<p className="text-danger">{error}</p> :""}

//                               <div className="my-4 position-relative">
//                                  <i className="fas fa-user icon-input-field"></i>
//                                  <label htmlFor="OTP" className="form-label required">Enter OTP </label>
//                                  <input type="text" 
//                                     value={formikOTP.values.OTP}
//                                     onChange={formikOTP.handleChange} 
//                                     onBlur={formikOTP.handleBlur}
//                                     className="form-control " id="OTP"  
//                                     name="OTP" 
//                                     required
//                                     placeholder="xx xx xx" />
//                                  {
//                                     formikOTP.errors.OTP  && formikOTP.touched.OTP?
//                                        <div className="text-danger m-0 p-0">{formikOTP.errors.OTP}</div> 
//                                        : 
//                                        <p className="text-success m-0 p-0">Enter Good Information Please !</p>
//                                  }
//                               </div>

//                               <div className="d-grid gap-2 col-8 mx-auto">
//                                  {loading ? 
//                                        <button className="btn bg-main text-white  mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
//                                     : 
//                                        <button disabled={!(formikOTP.isValid && formikOTP.dirty)} type="submit" className="btn bg-main text-white  mt-2">Send OTP to email</button>
//                                  }
//                               </div>

//                            </form>
//                         </div>
//                      </div>
//                }


//          </div>
//       </Fragment>
//    )
// }


















































