import axios from 'axios';
import React, { useState } from 'react'
import { Formik , Form , ErrorMessage, Field } from 'formik';
import toast from 'react-hot-toast';


import "./sickHistory.css";




export default function SickHistory() {
   const [selectedFile, setSelectedFile] = useState(null);
   const [error, setError] = useState(null);
   const [isLoadingAdded, setIsLoadingAdded] = useState(false);
   const token = localStorage.getItem("token")


      async function getData(file , values){
         setIsLoadingAdded(true)
         const formData = new FormData()
         let headers ={ 'enctype' :'multipart/form-data' , token} ;
         

         formData.append('disease' , values.disease);
         formData.append('medicines' , values.medicines);
         formData.append('surgeries' , values.surgeries);
         formData.append('file',file )

         console.log("Values" ,   values) ;
         console.log("formData" ,   formData) ;

         // axios.post("https://free-palestine-back-end.onrender.com/api/v1/company" ,formData,{headers})
         // .then((response)=>{
         //    setIsLoadingAdded(false)
         //    toast.success(response.data?.message);
         //    setTimeout(() => {
         //       window.location.reload()
         //    }, 1000);
         // })
         // .catch((error)=>{
         //    setIsLoadingAdded(false)
         //    toast.error(error.response?.data?.message)
         //    setError(error.response?.data?.message)
         //    setTimeout(() => {
         //       window.location.reload()
         //    }, 4000);
         // })
      }

      const validateForm = (values) => {
         const errors = {};
         //^ Validate title field :
         if (!values.disease) {
            errors.disease = 'Input Disease is required';
         }
         if (!values.medicines) {
            errors.medicines = 'Input Medicines is required';
         }
         if (!values.surgeries) {
            errors.surgeries = 'Input Surgeries is required';
         }

         //^ Validate image field :
         if (!values.file) {
            errors.file = 'Input image is required';
         }
         return errors;
      };

      return (
         <Formik
               initialValues={{
                  file: null ,
                  disease:"" ,
                  medicines:"" ,
                  surgeries:"" ,
               }} validate={validateForm}
               onSubmit={(values) => {getData(selectedFile , values)}}>
               {({ isSubmitting, setFieldValue }) => (
                  
                  <Form className='container SickHistory-container w-75 m-auto'>
                     <h1 className='main-header'>عرض وتعديل ملفى الطبى</h1>


                     <div className=" mt-3 p-2 position-relative">
                        <label htmlFor="disease" className="form-label text-center">هل لديك أمراض مزمنة ؟</label>
                        <Field 
                           as="textarea"
                           className="form-control"
                           name="disease"
                           id="disease"
                           rows="4" 
                           dir="rtl"
                           placeholder="اكتب هنا الامراض التى تعانى منها مثل : مرض السكرى - مرض ضغط الدم"
                        />
                        <ErrorMessage name="disease" component="div" className="text-danger" />
                     </div>


                     <div className=" mt-3  p-2 position-relative">
                        <label htmlFor="medicines" className="form-label text-center">هل تتناول ادوية مزمنة ؟</label>
                        <Field 
                           as="textarea"
                           className="form-control"
                           name="medicines"
                           id="medicines"
                           rows="4" 
                           dir="rtl"
                           placeholder="اكتب اسماء الادوية التى تتناولها"
                        />
                        <ErrorMessage name="medicines" component="div" className="text-danger" />
                     </div>


                     <div className=" mt-3 p-2 position-relative">
                        <label htmlFor="surgeries" className="form-label text-center">هل أجريت عمليات جراحية من قبل؟</label>
                        <Field 
                           as="textarea"
                           className="form-control"
                           name="surgeries"
                           id="surgeries"
                           rows="4" 
                           dir="rtl"
                           placeholder="اكتب اسم العملية الجراحية التى اجريتها"
                        />
                        <ErrorMessage name="surgeries" component="div" className="text-danger" />
                     </div>


                     <div className='mt-4 p-1 position-relative'>
                           <label htmlFor="image" className="form-label">إرفاق التقارير السابقة</label>
                           <input type="file" className="text-danger form-control" onChange={(event) => {setSelectedFile(event.target.files[0]);setFieldValue('file', event.target.files[0]);}}/>
                           <ErrorMessage name="file" component="div" className="text-danger" />
                     </div>

                     <div className='d-flex justify-content-center mt-4 '>
                        {isLoadingAdded? <>

                           <button type=" button"  className="btn bg-main w-75">
                              <i className='fas fa-spinner fa-spin fs-4'/>
                           </button>

                        </> : <>
                           <button type="submit" disabled={isSubmitting} className="btn bg-main w-75">إرسال البيانات</button>
                        </>}
                     </div>

                  </Form>
               )}
         </Formik>
    );
}
