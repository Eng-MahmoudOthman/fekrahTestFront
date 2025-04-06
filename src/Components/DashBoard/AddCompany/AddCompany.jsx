
import React , {Fragment , useState } from 'react';
import { Formik , Form , ErrorMessage, Field } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



export default function AddCompany() {

      const [selectedFile, setSelectedFile] = useState(null);
      const [isLoadingAdded, setIsLoadingAdded] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate() ;
      const token = `${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("token") }`;


      const togglePassword = () => {
         setShowPassword((prev) => !prev);
      };


      async function getData(file , values){
         setIsLoadingAdded(true)
         const formData = new FormData()
         let headers ={ 'enctype' :'multipart/form-data' , token} ;
         
      
         formData.append('name' , values.name);
         formData.append('description' , values.description);
         formData.append('address' , values.address);
         formData.append('phone' , values.phone);
         formData.append('email' , values.email);
         formData.append('password' , values.password);
      
      
         formData.append('file',file )
         axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/company` ,formData,{headers})
         .then((response)=>{
            setIsLoadingAdded(false)
            toast.success(response.data?.message);
            navigate('/dashBoard/companyDashboard')
         })
         .catch((error)=>{
            setIsLoadingAdded(false)
            Swal.fire({
               title:error.response.data.message  ,
               text: "Please Try Again" ,   
               icon: "error"
            });
            setTimeout(() => {
               window.location.reload()
            }, 4000);
         })
      }
      
      const validateForm = (values) => {
         const errors = {};
         //^ Validate name field :
         if (!values.name) {
            errors.name = 'Input name is required';
         }
      
         //^ Validate description field :
         if (!values.description) {
            errors.description = 'Input description is required';
         }
      
         //^ Validate address field :
         if (!values.address) {
            errors.address = 'Input address is required';
         }
      
         //^ Validate email field :
         if (!values.email) {
            errors.email = 'Input email is required';
         }
      
         //^ Validate phone field :
         if (!values.phone) {
            errors.phone = 'Input phone is required';
         }

         //^ Validate password field :
         if (!values.password) {
            errors.password = 'Input password is required';
         }
      
         //^ Validate image field :
         // if (!values.file) {
         //    errors.file = 'Input image is required';
         // }
         return errors;
      };

      return (
         <Fragment>
            <Formik
                  initialValues={{
                     file: null ,
                     name:"" ,
                     address :"" ,
                     phone:"" ,
                     description :"",
                     email:"" ,
                     password:"" ,
                  }} validate={validateForm}
                  onSubmit={(values) => {getData(selectedFile , values)}}>
                  {({ isSubmitting, setFieldValue }) => (
                     
                     <Form className='w-75 m-auto'>
                        <h1 className='main-header'>Add New Company</h1>
                        <div className='under-header'></div>


                        <div  className='mt-2'>
                              <label htmlFor="name" className="form-label required">Add Company Name</label>
                              <Field type="text" className="form-control"  name="name" id="name" />
                              {/* {selectedFile && <p>name: {selectedFile.name}</p>} */}
                              <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="description" className="form-label required">Add Description</label>
                              <Field type="text"  name="description" id="description" className="form-control"/>
                              {/* {selectedFile && <p>Description: {selectedFile.name}</p>} */}
                              <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="address" className="form-label required">Add address</label>
                              <Field type="text"  name="address" id="address" className="form-control"/>
                              {/* {selectedFile && <p>address: {selectedFile.name}</p>} */}
                              <ErrorMessage name="address" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="phone" className="form-label required">Add phone</label>
                              <Field type="text"  name="phone" id="phone" className="form-control"/>
                              {/* {selectedFile && <p>phone: {selectedFile.name}</p>} */}
                              <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4'>
                              <label htmlFor="email" className="form-label required">Add email</label>
                              <Field 
                                 type="text"  
                                 name="email" 
                                 id="email" 
                                 className="form-control" 
                              />
                              {/* {selectedFile && <p>email: {selectedFile.name}</p>} */}
                              <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>


                        <div  className='mt-4 position-relative'>
                              <label htmlFor="password" className="form-label required">Add password</label>
                     <i className="fas fa-lock icon-input-field"></i>

                              <Field 
                                 type={showPassword ? "text" : "password"}  
                                 name="password" 
                                 id="password" 
                                 className="form-control"
                                 
                                 /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                                 onCopy={(e) => e.preventDefault()}
                                 onPaste={(e) => e.preventDefault()}
                                 onCut={(e) => e.preventDefault()}
                                 onContextMenu={(e) => e.preventDefault()}
                              />
                              {/* {selectedFile && <p>password: {selectedFile.name}</p>} */}

                              <i className="fas fa-eye toggle-password"></i>


                              {showPassword ? (
                                 <i className="fas fa-eye toggle-password" onClick={() => setShowPassword(false)}></i>
                              ) : (
                                 <i className="fas fa-eye-slash toggle-password" onClick={() => setShowPassword(true)}></i>
                              )}

                              <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>


                        <div className='mt-4'>
                              <label htmlFor="image" className="form-label required">Upload Image:</label>
                              <input type="file" className="text-danger form-control" onChange={(event) => {setSelectedFile(event.target.files[0]);setFieldValue('file', event.target.files[0]);}}/>
                              {/* {selectedFile && <p>Selected File: {selectedFile.name}</p>} */}
                              <ErrorMessage name="file" component="div" className="text-danger" />
                        </div>

                        <div className='d-flex justify-content-center mt-4 '>
                           {isLoadingAdded? <>

                              <button className="btn bg-main w-50">
                                 <i className='fas fa-spinner fa-spin fs-4'/>
                              </button>

                           </> : <>
                              <button type="submit" disabled={isSubmitting} className="btn bg-main w-50">Add Company</button>
                           </>}
                        </div>

                     </Form>
                  )}
            </Formik>     
         </Fragment>
      )
}















