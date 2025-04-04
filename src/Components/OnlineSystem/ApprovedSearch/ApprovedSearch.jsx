import axios from 'axios';
import React, { Fragment, useState } from 'react'
import Swal from 'sweetalert2';

export default function ApprovedSearch() {
   const[orderDetails  , setOrderDetails] = useState(null) ;
   
   const header = {
      token:`${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("company_token") }` 
   } ;


   const searchData = (e)=>{
      if(e.target.value.length == 10){
         getApprovedOrder(e.target.value)
      }else{
         setOrderDetails(null)
      }
   }


   async function getApprovedOrder (invoice_number){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/onlineSystem?invoice_number=${invoice_number}`  ,  {headers:header} )
      .then((response)=>{
         if(response?.data.message === "success"){
            setOrderDetails(response.data.order);
         }
      })
      .catch((error)=>{
         setOrderDetails(null)
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
         });
      })
   }


   return (
      <Fragment>
         <div className="container">
         <h1 className='main-header mt-5 pt-5'> Search For Approvals Orders</h1>
         <div className='under-header'></div>  
            <div className="row">

               <div className="w-75 m-auto my-5">
                  <form  className='text-center'>
                     <label htmlFor="test_search" className='mb-2 fs-4 text-success'>Enter Invoice Number For Patient</label>
                     <input type="number" onChange={(e)=>{searchData(e)}} className='form-control'  placeholder='Search By Invoice Number For Patient'  name="search" />
         
                  </form>
               </div>

               {orderDetails ? <>

                     <div className="col-md-12 mb-4">
                        <h3 className='text-center'>Patient Information</h3>
                        <div className='border border-1 p-2 rounded-2'>
                           <table className="table table-sm table-striped">

                              <tbody>
                                 <tr>
                                    <th scope="row">Company Name :</th>
                                    <td>{orderDetails.company_Name}</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">Name :</th>
                                    <td>{orderDetails.patient_Name}</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">Age :</th>
                                    <td>{orderDetails.patient_Age}</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">Phone Number :</th>
                                    <td>{orderDetails.patient_Phone}</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">History :</th>
                                    <td>{orderDetails.patient_History}</td>
                                 </tr>
                              </tbody>

                           </table>
                        </div>
                     </div>

                     <div className="col-md-12 mb-4">
                        <h3 className='text-center'>Order Information</h3>
                        <div className='border border-1 p-2 rounded-2'>
                           <table className="table table-sm table-striped">

                              <tbody>
                                 <tr>
                                    <th scope="row">invoice Number :</th>
                                    <td>{orderDetails.invoice_number}</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">is Paid :</th>
                                    <td>{orderDetails.is_Paid ? <span className='text-success'>Yes <i className="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i className="fa-solid fa-xmark m-2"></i></span>}</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">is Cancel  :</th>
                                    <td>{orderDetails.is_Cancel ? <span className='text-success'>Yes <i className="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i className="fa-solid fa-xmark m-2"></i></span>}</td>
                                 </tr>
                                 <tr>
                                    <th scope="row">is Done :</th>
                                    <td>{orderDetails.is_Done ? <span className='text-success'>Yes <i className="fa-solid fa-check m-2"></i></span>: <span className='text-danger m-0 p-0'>No <i className="fa-solid fa-xmark m-2"></i></span>}</td>
                                 </tr>
                              </tbody>

                           </table>
                        </div>
                     </div>

                  </> : <>
                     <div className='alert alert-danger'>Not Found Order this Invoice Number</div>
                  </>
               }

            </div>
         </div>
      </Fragment>
   )
}
