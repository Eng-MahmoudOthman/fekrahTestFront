import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup';

import "./priceOffers.css"
import { TestContext } from '../../Context/TestContext.js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import logo from "../../Assets/images/2.jpeg"
import { CartContext } from '../../Context/CartContext.js';
import { useNavigate } from 'react-router-dom';




export default function PriceOffers() {

   const{getLoggedCart} = useContext(CartContext) ;
   const [listTest , setListTest] = useState([]);
   const [search , setSearch] = useState([]);
   const [priceOffer , setPriceOffer] = useState([]);
   const navigate = useNavigate();

   const header = {
      token:`${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("token") }` 
   } ;

     //& Search Test By Test Name :
   function searchInput (e){
      if(e.target.value === ""){
         setSearch([])
      }
      if(e.target.value.length >= 3){
         getSearchData((e.target.value).toLowerCase())
      }
   }



   //& Get All test And Search On Test By Test Name :
   async function getSearchData(search){
      let response =   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/test?keyword=${search}`)
      .catch((error)=>{
         toast.warn(error.response.data.message + " Or Not Found" , {
            position: "top-right"
         });
      })
      if(response?.data.message === "success"){
         setSearch(response?.data.tests)
      }
   }


   //& Get All Tests Prices From All Companies :
   async function getAllTestPrice(){
      let response =   await axios.post(`http://localhost:5000/api/v1/offers/prices` , {listIdTest:listTest} , {headers:header})
      .catch((error)=>{
         toast.warn(error.response.data.message , {
            position: "top-right"
         });
      })
      if(response?.data.message === "success"){
         setPriceOffer(response?.data.priceList)
      }
   }

   

   //& Search Test By Test Name :
   function addTestToList (id){
      if(listTest.find((ele)=>ele===id)){
         return ;
      }
      setListTest([...listTest , id])
   }


   const addTestId = (ele)=>{
      let listIdTest = [] ;
      let company_id = "" ;
      ele.arr.forEach(async(item)=>{
         listIdTest.push(item.test)
         company_id = item.company ;
      })
      addAllTestToCart(listIdTest , company_id)
   }


      //& Get All test And Search On Test By Test Name :
      async function addAllTestToCart(listIdTest , company_id){
         let response =   await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/addAllTest` , {listIdTest , company_id} , {headers:header})
         .catch((error)=>{
            toast.warn(error.response.data.message , {
               position: "top-right"
            });
         })
         if(response?.data.message === "success"){
            getLoggedCart() ;
            navigate("/cart")
         }
      }


   useEffect(() => {
      if(!listTest.length) return ;
      getAllTestPrice()
   }, [listTest])


   return (
      <Fragment>
         {/* {console.log(priceOffer)} */}
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header ">إضافة تحاليل جديدة </h1>
            <form action="">
               <input type="search" onChange={(e)=>{searchInput(e)}}  className='form-control' id='test_search' placeholder='Search By Test Name'  name="search" />
            </form>

            {search.length? 
               <div className='search-result m-2  p-2 bg-body-secondary rounded-2 overflow-auto'>
                  {search.map((ele)=> <p key={ele._id} onClick={()=>addTestToList(ele._id)} className='m-0 my-1 text-success cursor'>{ele.name}</p>)}
               </div>
               : ""
            }
         </div>

         {/* <div>
            <div className="table mb-5">
               <table className='table table-sm text-center table-group-divider table-striped table-responsive-md '>

                  <thead>
                     <th>Test</th>
                     <th>Price</th>
                     <th>Price After Discount</th>
                     <th>Discount</th>
                  </thead>

                  <tbody>
                     <tr>
                        <td className='fullName'>urine</td>
                        <td>123</td>
                        <td>100</td>
                        <td>30</td>
                        <td>90</td>
                     </tr>
                  </tbody>

               </table>
            </div>
         </div> */}

         <div className="container my-4">
            <div className="row g-1">
               {priceOffer.length? priceOffer.map((ele)=> <div key={ele.CompanyName} className="col-lg-6">
                     <div className="p-4 bg-light rounded-5">
                        <div className='d-flex justify-content-between align-items-center'>
                           <h2>{ele.CompanyName}</h2>
                           <div className='w-25 text-end'>
                              <img src={logo} className='w-50' alt="logo" />
                           </div>
                        </div>

                        <div className="table mb-2">
                           <table className='table table-sm text-center table-group-divider table-striped table-responsive-md '>

                              <thead>
                                 <tr>
                                    <th>Test</th>
                                    <th>Price</th>
                                    <th>Price After Discount</th>
                                 </tr>
                              </thead>

                              <tbody>
                                 {ele.arr.map((price)=>                                 
                                    <tr key={price._id}>
                                       <td>{price.testName}</td>
                                       <td>{price.price}</td>
                                       <td>{price.priceAfterDiscount}</td>
                                    </tr>
                                 )}
                              </tbody>

                              <tfoot>
                                 <tr className='fw-bold'>
                                    <td></td>
                                    <td className='text-danger text-decoration-line-through'>{ele.total.totalPrice}</td>
                                    <td className='text-success'>{ele.total.totalPriceAfterDiscount}</td>
                                 </tr>
                              </tfoot>

                           </table>
                        </div>

                        <div className='text-center'>
                           <button onClick={()=>{addTestId(ele)}} className='btn bg-main w-75'>إتمام حجز الاوردر</button>
                        </div>
                     </div>
                  </div> ) : ""}
            </div>
         </div>

      </Fragment>
   )
}
