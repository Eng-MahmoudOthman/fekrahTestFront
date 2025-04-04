// import axios from "axios";
// import { useContext, useEffect, useRef, useState } from "react";
// import Swal from "sweetalert2";
// import { CompanyContext } from "../../../Context/CompanyContext.js";
// import { Fragment } from "react";
// import "./ReportDashboard.css"




// export default function ReportDashboard() {
//    const [start , setStart] = useState("") ;
//    const [end , setEnd] = useState("") ;
//    const {allCompanyInfo , getAllCompanyInfo} = useContext(CompanyContext)
   
//    const [companyId ,setCompanyId] = useState("") ;
//    const [checkedCompany , setCheckedCompany] = useState(false) ;
//    const inputCompany = useRef(null) ;
   

   
//    const [specificDay , setSpecificDay] = useState("") ;
//    const [checkedDay , setCheckedDay] = useState(false) ;
//    const inputDay = useRef(null) ;
   
//    const [specificMonth , setSpecificMonth] = useState("") ;
//    const [checkedMonth , setCheckedMonth] = useState(false) ;
//    const inputMonth = useRef(null) ;
   
//    const [specificYear , setSpecificYear] = useState("") ;
//    const [checkedYear , setCheckedYear] = useState(false) ;
//    const inputYear = useRef(null) ;
   
//    const [patient , setPatient] = useState("") ;
//    const [checkedPatient , setCheckedPatient] = useState(false) ;
//    const inputPatient = useRef(null) ;
   
//    const header = {
//       token:`${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("token") }` 
//    } ;
   




//    async function getAllOrders(){
//       await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/report` , 
//          {
//             start:start || undefined , 
//             end : end || undefined , 
//             company_id : companyId || undefined , 
//             patient: patient || undefined , 
//             specificDay : specificDay || undefined , 
//             specificMonth : specificMonth || undefined , 
//             specificYear : specificYear || undefined
//          } ,  {headers:header}
//       )
//       .then((response)=>{
//          if(response.data.message === "success"){
//             Swal.fire({
//                title: "Please Wait Seconds",
//                html: "Creating The PDF File After <b></b> milliseconds." ,
//                timer: 3000 ,
//                timerProgressBar: true ,
//                didOpen: () => {
//                   Swal.showLoading() ;
//                   const timer = Swal.getPopup().querySelector("b") ;
//                   setInterval(() => {
//                      timer.textContent = `${Swal.getTimerLeft()}` ;
//                   }, 100);
//                },
//             });
//             setTimeout( () => {
//                window.open(response.data.pathFile, '_blank');
//             }, 3000); 
//          }
//       })
//       .catch((error)=>{
//          Swal.fire({
//             title:error.response.data.message  ,
//             text: "Please Try Again" ,   
//             icon: "error"
//          });
//       });
//    }





//    function handleCheckCompany(checked){
//       setCheckedCompany(checked) ;
//       setCompanyId(undefined)
//       inputCompany.current.value = "Select Company"
//    }

//    function handleCheckDay(checked){
//       setCheckedDay(checked) ;
//       setSpecificDay(undefined) ;
//       inputDay.current.value = undefined
//    }

//    function handleCheckMonth(checked){
//       setCheckedMonth(checked) ;
//       setSpecificMonth(undefined) ;
//       inputMonth.current.value = undefined
//    }

//    function handleCheckYear(checked){
//       setCheckedYear(checked) ;
//       setSpecificYear(undefined) ;
//       inputYear.current.value = undefined
//    }

//    function handleCheckPatient(checked){
//       setCheckedPatient(checked) ;
//       setPatient(undefined) ;
//       inputPatient.current.value = undefined
//    }


//    useEffect(() => {
//       getAllCompanyInfo()
//    },[])

//    return (
//       <Fragment>
//          <div className="container">
//             <form action="" className="form-control mt-5">
//                <div className="d-table w-100">

//                   {/* Row 1: Choose Company */}
//                   <div className="d-table-row">
//                      <div className="d-table-cell px-2 py-2">
//                         <label htmlFor="company" className="col-form-label">Choose Company</label>
//                      </div>
//                      <div className="d-table-cell px-2 py-2">
//                         <select  ref={inputCompany} disabled={!checkedCompany} name="company" id="company" className="form-control" onChange={(e) => setCompanyId(e.target.value)}>
//                            <option>Select Company</option>
//                            {allCompanyInfo.length ? allCompanyInfo.map((ele) => (
//                               <option key={ele._id} value={ele._id}>{ele.name}</option>
//                            )) : ""}
//                         </select>
//                      </div>
//                      <input type="checkbox"  onChange={(e)=>handleCheckCompany(e.target.checked)}/>
//                   </div>


//                   {/* Row 2: From Date */}
//                   <div className="d-table-row">
//                      <div className="d-table-cell px-2 py-2">
//                         <label htmlFor="start" className="col-form-label">From</label>
//                      </div>
//                      <div className="d-table-cell px-2 py-2">
//                         <input type="date"  id="start" className="form-control" onChange={(e) => setStart(e.target.value)}/>
//                      </div>
//                   </div>

//                   {/* Row 3: To Date */}
//                   <div className="d-table-row">
//                      <div className="d-table-cell px-2 py-2">
//                         <label htmlFor="end" className="col-form-label">To</label>
//                      </div>
//                      <div className="d-table-cell px-2 py-2">
//                         <input type="date" id="end" className="form-control"onChange={(e) => setEnd(e.target.value)}/>
//                      </div>
//                   </div>

//                   {/* Row 4: Day */}
//                   <div className="d-table-row ">
//                      <div className="d-table-cell px-2 py-2">
//                         <label htmlFor="day" className="col-form-label">Specific Day</label>
//                      </div>
//                      <div className="d-table-cell px-2 py-2">
//                         <input type="number" ref={inputDay} disabled={!checkedDay} id="day" className="form-control" placeholder="Enter Day" onChange={(e) => setSpecificDay(e.target.value.length === 2 ? e.target.value : `0${e.target.value}`)} max={31} min={1} />
//                      </div>
//                      <input type="checkbox" onChange={(e)=>handleCheckDay(e.target.checked)}/>
//                   </div>

//                   {/* Row 5: Month */}
//                   <div className="d-table-row">
//                      <div className="d-table-cell px-2 py-2">
//                         <label htmlFor="month" className="col-form-label">Specific Month</label>
//                      </div>
//                      <div className="d-table-cell px-2 py-2">
//                         <input
//                            type="number"
//                            ref={inputMonth}
//                            disabled={!checkedMonth} 
//                            id="month"
//                            className="form-control"
//                            placeholder="Enter Month"
//                            onChange={(e) => setSpecificMonth(e.target.value.length === 2 ? e.target.value : `0${e.target.value}`)}
//                            max={12} min={1}
//                         />
//                      </div>
//                      <input type="checkbox" onChange={(e)=>handleCheckMonth(e.target.checked)}/>
//                   </div>

//                   {/* Row 6: Years */}
//                   <div className="d-table-row">
//                      <div className="d-table-cell px-2 py-2">
//                         <label htmlFor="year" className="col-form-label">Specific Year</label>
//                      </div>
//                      <div className="d-table-cell px-2 py-2">
//                         <input
//                            type="number"
//                            ref={inputYear}
//                            disabled={!checkedYear} 
//                            id="year"
//                            className="form-control"
//                            placeholder="Enter Year"
//                            onChange={(e) => setSpecificYear(e.target.value)}
                           
//                         />
//                      </div>
//                      <input type="checkbox" onChange={(e)=>handleCheckYear(e.target.checked)}/>
//                   </div>

//                   {/* Row 7: Patient */}
//                   <div className="d-table-row">
//                      <div className="d-table-cell px-2 py-2">
//                         <label htmlFor="patient" className="col-form-label">Patient</label>
//                      </div>
//                      <div className="d-table-cell px-2 py-2">
//                         <input
//                            type="text"
//                            ref={inputPatient}
//                            disabled={!checkedPatient} 
//                            id="patient"
//                            className="form-control"
//                            placeholder="Phone Or Name"
//                            onChange={(e) => setPatient(e.target.value)}
//                         />
//                      </div>
//                      <input type="checkbox" onChange={(e)=>handleCheckPatient(e.target.checked)}/>
//                   </div>
//                </div>

//             </form>

//             <div className="text-center">
//                <button onClick={()=>{getAllOrders()}} className="btn btn-primary text-center w-50 my-2">
//                      طباعة التقرير  <i className="fa-solid fa-print mx-2"></i>
//                </button>
//             </div>
//          </div>
//       </Fragment>
//    )
// }










import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { CompanyContext } from "../../../Context/CompanyContext.js";
import { Fragment } from "react";
import "./ReportDashboard.css"




export default function ReportDashboard() {
   const [start , setStart] = useState("") ;
   const [end , setEnd] = useState("") ;
   const {allCompanyInfo , getAllCompanyInfo} = useContext(CompanyContext)
   
   const [companyId ,setCompanyId] = useState("") ;
   const [checkedCompany , setCheckedCompany] = useState(false) ;
   const inputCompany = useRef(null) ;
   

   
   const [specificDay , setSpecificDay] = useState("") ;
   const [checkedDay , setCheckedDay] = useState(false) ;
   const inputDay = useRef(null) ;
   
   const [specificMonth , setSpecificMonth] = useState("") ;
   const [checkedMonth , setCheckedMonth] = useState(false) ;
   const inputMonth = useRef(null) ;
   
   const [specificYear , setSpecificYear] = useState("") ;
   const [checkedYear , setCheckedYear] = useState(false) ;
   const inputYear = useRef(null) ;
   
   const [patient , setPatient] = useState("") ;
   const [checkedPatient , setCheckedPatient] = useState(false) ;
   const inputPatient = useRef(null) ;
   
   const header = {
      token:`${process.env.REACT_APP_SECRET_TOKEN} ${localStorage.getItem("token") }` 
   } ;
   




   async function getAllOrders(){
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/report` , 
         {
            start:start || undefined , 
            end : end || undefined , 
            company_id : companyId || undefined , 
            patient: patient || undefined , 
            specificDay : specificDay || undefined , 
            specificMonth : specificMonth || undefined , 
            specificYear : specificYear || undefined
         } ,  {headers:header}
      )
      .then((response)=>{
         if(response.data.message === "success"){
            Swal.fire({
               title: "Please Wait Seconds",
               html: "Creating The PDF File After <b></b> milliseconds." ,
               timer: 3000 ,
               timerProgressBar: true ,
               didOpen: () => {
                  Swal.showLoading() ;
                  const timer = Swal.getPopup().querySelector("b") ;
                  setInterval(() => {
                     timer.textContent = `${Swal.getTimerLeft()}` ;
                  }, 100);
               },
            });
            setTimeout( () => {
               window.open(response.data.pathFile, '_blank');
            }, 3000); 
         }
      })
      .catch((error)=>{
         Swal.fire({
            title:error.response.data.message  ,
            text: "Please Try Again" ,   
            icon: "error"
         });
      });
   }





   function handleCheckCompany(checked){
      setCheckedCompany(checked) ;
      setCompanyId(undefined)
      inputCompany.current.value = "Select Company"
   }

   function handleCheckDay(checked){
      setCheckedDay(checked) ;
      setSpecificDay(undefined) ;
      inputDay.current.value = undefined
   }

   function handleCheckMonth(checked){
      setCheckedMonth(checked) ;
      setSpecificMonth(undefined) ;
      inputMonth.current.value = undefined
   }

   function handleCheckYear(checked){
      setCheckedYear(checked) ;
      setSpecificYear(undefined) ;
      inputYear.current.value = undefined
   }

   function handleCheckPatient(checked){
      setCheckedPatient(checked) ;
      setPatient(undefined) ;
      inputPatient.current.value = undefined
   }


   useEffect(() => {
      getAllCompanyInfo()
   })

   return (
      <Fragment>
         <div className="container">
            <form action="" className="form-control mt-5">
               <div className="d-table w-100">

                  {/* Row 1: Choose Company */}
                  <div className="d-table-row">
                     <div className="d-table-cell px-2 py-2">
                        <label htmlFor="company" className="col-form-label">Choose Company</label>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <select  ref={inputCompany} disabled={!checkedCompany} name="company" id="company" className="form-control" onChange={(e) => setCompanyId(e.target.value)}>
                           <option>Select Company</option>
                           {allCompanyInfo.length ? allCompanyInfo.map((ele) => (
                              <option key={ele._id} value={ele._id}>{ele.name}</option>
                           )) : ""}
                        </select>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="checkbox"  onChange={(e)=>handleCheckCompany(e.target.checked)}/>
                     </div>
                  </div>


                  {/* Row 2: From Date */}
                  <div className="d-table-row">
                     <div className="d-table-cell px-2 py-2">
                        <label htmlFor="start" className="col-form-label">From</label>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="date"  id="start" className="form-control" onChange={(e) => setStart(e.target.value)}/>
                     </div>
                  </div>

                  {/* Row 3: To Date */}
                  <div className="d-table-row">
                     <div className="d-table-cell px-2 py-2">
                        <label htmlFor="end" className="col-form-label">To</label>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="date" id="end" className="form-control"onChange={(e) => setEnd(e.target.value)}/>
                     </div>
                  </div>

                  {/* Row 4: Day */}
                  <div className="d-table-row ">
                     <div className="d-table-cell px-2 py-2">
                        <label htmlFor="day" className="col-form-label">Specific Day</label>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="number" ref={inputDay} disabled={!checkedDay} id="day" className="form-control" placeholder="Enter Day" onChange={(e) => setSpecificDay(e.target.value.length === 2 ? e.target.value : `0${e.target.value}`)} max={31} min={1} />
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="checkbox" onChange={(e)=>handleCheckDay(e.target.checked)}/>
                     </div>
                  </div>

                  {/* Row 5: Month */}
                  <div className="d-table-row">
                     <div className="d-table-cell px-2 py-2">
                        <label htmlFor="month" className="col-form-label">Specific Month</label>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input
                           type="number"
                           ref={inputMonth}
                           disabled={!checkedMonth} 
                           id="month"
                           className="form-control"
                           placeholder="Enter Month"
                           onChange={(e) => setSpecificMonth(e.target.value.length === 2 ? e.target.value : `0${e.target.value}`)}
                           max={12} min={1}
                        />
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="checkbox" onChange={(e)=>handleCheckMonth(e.target.checked)}/>
                     </div>
                  </div>

                  {/* Row 6: Years */}
                  <div className="d-table-row">
                     <div className="d-table-cell px-2 py-2">
                        <label htmlFor="year" className="col-form-label">Specific Year</label>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input
                           type="number"
                           ref={inputYear}
                           disabled={!checkedYear} 
                           id="year"
                           className="form-control"
                           placeholder="Enter Year"
                           onChange={(e) => setSpecificYear(e.target.value)}
                           
                        />
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="checkbox" onChange={(e)=>handleCheckYear(e.target.checked)}/>
                     </div>
                  </div>

                  {/* Row 7: Patient */}
                  <div className="d-table-row">
                     <div className="d-table-cell px-2 py-2">
                        <label htmlFor="patient" className="col-form-label">Patient</label>
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input
                           type="text"
                           ref={inputPatient}
                           disabled={!checkedPatient} 
                           id="patient"
                           className="form-control"
                           placeholder="Phone Or Name"
                           onChange={(e) => setPatient(e.target.value)}
                        />
                     </div>
                     <div className="d-table-cell px-2 py-2">
                        <input type="checkbox" onChange={(e)=>handleCheckPatient(e.target.checked)}/>
                     </div>
                  </div>
               </div>

            </form>

            <div className="text-center">
               <button onClick={()=>{getAllOrders()}} className="btn btn-primary text-center w-50 my-2">
                     طباعة التقرير  <i className="fa-solid fa-print mx-2"></i>
               </button>
            </div>
         </div>
      </Fragment>
   )
}
