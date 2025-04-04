import React, { useContext } from 'react'
import "./morePage.css"
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext.js';
import { UserContext } from '../../Context/UserContext.js';








export default function MorePage() {
   
   const navigate = useNavigate() ;
   const {loggedUser , setLoggedUser , userToken , setUserToken , admin , setAdmin , moderator , setModerator } = useContext(UserContext);
   const {itemCount , setItemCount , getLoggedCart } = useContext(CartContext);

   const services = [
      {name:"شحن محفظتى" , url:"#" , icon:<i class="fa-solid fa-wallet"></i>} ,
      {name:"روشتاتى " , url:"#" , icon:<i class="fa-solid fa-file-waveform"></i>} ,
      {name:"التغطية التأمينية" , url:"#" , icon:<i class="fa-solid fa-umbrella"></i>} ,
      {name:"عروضى المفضلة" , url:"#" , icon:<i class="fa-solid fa-heart-pulse"></i>} ,
      {name:"مشترياتى" , url:"#" , icon:<i class="fa-solid fa-bag-shopping"></i>} ,
      {name:"أحجز بلس" , url:"#" , icon:<i class="fa-solid fa-crown"></i>} ,
      {name:"مقدمى الخدمات" , url:"#" , icon:<i class="fa-solid fa-briefcase-medical"></i>} ,
      {name:"تغيير كلمة المرور" , url:"#" , icon:<i class="fa-solid fa-lock"></i>} ,
      {name:"عن أحجز " , url:"#" , icon:<i class="fa-regular fa-font-awesome"></i>} ,
      {name:"أتصل بنا" , url:"#" , icon:<i class="fa-solid fa-phone"></i>} ,
      {name:"اللغة " , url:"/" , icon:<i class="fa-solid fa-earth-americas"></i>} ,
      {name:"خروج" , click:logOut , icon:<i class="fa-solid fa-right-from-bracket"></i>} ,
   ]



   
   //& Handle Log Out :
   function logOut(){
      localStorage.clear() ;

      setLoggedUser({}) ;
      setUserToken("") ;
      setAdmin(false) ;
      setModerator(false)
      setItemCount(0)
      navigate("/login")
   }

   return (
      <>
         <div className="container morePage-container">
            <div className='text-center'>
               <Link to={`/updateUserProfile`} className='btn btn-success w-25' >تعديل بياناتى</Link>
               <p className='my-2'> أحجز العادية  |    1440</p>
            </div>

            <div className='account-card d-flex justify-content-center align-item-center text-center'>
               <div className='bg-light  rounded-start-pill'>
                  <p className='m-0 fw-bold text-success' dir='rtl'>00.00 جنية</p>
                  <p className='m-0'>المحفظة الأضافية</p>
               </div>
               <div className='bg-light rounded-end-pill '>
                  <p className='m-0 fw-bold text-success' dir='rtl'>00.00 جنية</p>
                  <p className='m-0'>المحفظةالأساسية</p>
               </div>
            </div>


            <div className='my-2 text-center '>
               <Link to="/SickHistory" className='btn btn-success w-75'>عرض وتعديل ملفى الطبى</Link>
            </div>

            <div className="row btn-group" dir='rtl'>
               {services.map((ele , index)=>
                  <div key={index} className="col-6 col-md-4">
                     <div className='p-1'>
                        <Link to={ele.url?ele.url:""} onClick={ele.click?()=>{ele.click()}:""}  className='btn btn-secondary w-100 border-0'>
                           <div className='d-flex justify-content-between align-items-center px-4'>
                              <span className='d-inline-block'>{ele.name}</span>
                              {ele.icon}
                           </div>
                        </Link>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}
