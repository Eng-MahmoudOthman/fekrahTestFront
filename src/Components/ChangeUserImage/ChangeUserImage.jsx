import React, { Fragment, useContext, useState } from 'react'
import { Formik , Form , ErrorMessage } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./changeUserImage.css"
import { UserContext } from '../../Context/UserContext.js';


export default function ChangeUserImage() {

   const [selectedFile, setSelectedFile] = useState(null);
   const [loading , setLoading] = useState(false)
   const navigate = useNavigate()

   const{setLoggedUser} = useContext(UserContext) ;


   async function getData(image , values ){
      setLoading(true)
      let headers = {
         'enctype' :'multipart/form-data' , 
         token:`${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("token") }`
      };
      const formData = new FormData()
      formData.append('file', image ) ;

      axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/users` , formData , {headers})
      .then(({data})=>{
         if(data.message === "success") {
            console.log("Done");
            console.log(data.newUser);

            localStorage.setItem("user" , JSON.stringify(data.newUser))
            setLoggedUser(data.newUser) ;

            setLoading(false)
            toast.success("Successfully Update Image");
         }
         // navigate("/")

      })
      .catch((error)=>{
         toast.error(error.response?.data?.message)
         setLoading(false)
      })
   }


   const validateForm = (values) => {
      const errors = {};
      //^ Validate image field :
      if (!values.file) {
         errors.imgCover = 'Input image is required';
      }
      return errors;
   };

   return (
      <Fragment>
         <div className="container changeUserImage-container">
            <div className="">
               <Formik
                     initialValues={{
                        imgCover: null ,
                     }} validate={validateForm}
                     onSubmit={(values) => {getData(selectedFile , values)}}>
                     {({ isSubmitting, setFieldValue }) => (
                        
                        <Form className='w-75 m-auto mt-5 pt-5'>
                           <h1 className='main-header'>تغيير الصورة الشخصية</h1>
                           <div className='under-header'></div>

                           <div className='mt-4'>
                                 <label htmlFor="imgCover" className="form-label">Upload Image:</label>
                                 <input type="file" id='imgCover' className="text-danger form-control" onChange={(event) => {setSelectedFile(event.target.files[0]);setFieldValue('file', event.target.files[0]);}}/>
                                    {/* {selectedFile && <p>Selected File: {selectedFile.name}</p>} */}

                                 <ErrorMessage name="imgCover" component="div" className="text-danger" />
                           </div>
                           
                           <div className='text-center'>
                              {loading? 
                                 <button className="btn bg-main text-white btn-lg mt-2 w-50 m-auto"><i className="fa fa-spinner fa-spin text-white fa-1x"></i></button> 
                                 : 
                                 <button type="submit" disabled={isSubmitting} className="btn bg-main w-50  mt-4">Change Image</button>
                              }
                           </div>

                        </Form>
                     )}
               </Formik>
            </div>
         </div>
      
      
      </Fragment>
   )
}
