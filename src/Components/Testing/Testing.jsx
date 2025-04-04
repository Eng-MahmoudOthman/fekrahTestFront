import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./test.css"
import { Carousel } from 'react-bootstrap';

import home_4 from "../../Assets/images/home2.jpg"
import profileUrl from "../../Assets/images/profile.webp"

import nursing from "../../Assets/homePage/nursing.png" ;
import face from "../../Assets/homePage/face-brush.png" ;
import drugs from "../../Assets/homePage/drugs.png" ;
import eyes from "../../Assets/homePage/eyes.png" ;
import hospital from "../../Assets/homePage/hospital.png" ;
import radiation from "../../Assets/homePage/radiation.png" ;
import physical from "../../Assets/homePage/physical.png" ;
import tooth from "../../Assets/homePage/tooth.png" ;
import test from "../../Assets/homePage/blood-test.png" ;
import free from "../../Assets/homePage/free.png" ;
import stomach from "../../Assets/homePage/stomach.png" ;
import { Link } from 'react-router-dom';




export default function Testing() {

   const[imageUrl , setImageUrl] = useState(profileUrl)

   const sliderContent = [home_4 , home_4 , home_4 , home_4 , ];
   const services = [
      { name: "الأسنان", icon: tooth  , url:"/teeth"}, 
      { name: "الأشعة", icon: radiation  , url:"/radiologyProfile"}, 
      { name: "التحاليل", icon: test  , url:"/offers"}, 
      { name: "المناظير", icon: stomach  , url:"/endoscopes"}, 
      { name: "العيون", icon: eyes  , url:"/eyes"}, 
      { name: "التجميل", icon: face , url:"/cosmetology"}, 
      { name: "العلاج الطبيعى", icon: physical  , url:"/physicalTherapy"} ,
      { name: "المستشفيات", icon: hospital  , url:"/hospital"}, 
      { name: "الصيدلية", icon: drugs  , url:"/pharmacy"} ,
      { name: "التمريض", icon: nursing  , url:"/nursing"} 
   ];

   return ( 
      
      <div className=" container"> 

         {/* Info Section with Slider */}
         <section className="home-slider p-3 rounded-2 mb-3 bg-light">
            <h2 className="h2 text-center fw-bold"><span className='text-primary'>F</span>EKRAH MEDICAL - احجز</h2>
            <Carousel indicators={false} controls={true} interval={2000} >
               {sliderContent.map((image, index) => (
                  <Carousel.Item key={index} className='carousel-item'>
                     <div className="text-center carousel-div">
                        <img src={image} alt="cover" className='w-100 carousel-img'/>
                     </div>
                  </Carousel.Item>
               ))}
            </Carousel>
         </section>


         {/* Services Grid */}
         <div className="row g-2 bg-body-secondary rounded-2">
            {services.map((service, index) => (
               <div key={index} className="col-4 col-lg-2 my-1">
                  <Link to={service.url}>
                     <div className="card text-center p-1">
                        <div className="mb-2"><img src={service.icon} className='w-25' alt="cover"/></div>
                        <p className="h6">{service.name}</p>
                     </div>
                  </Link>
               </div>
            ))}
         </div>

      </div>
   )
}







