import { Fragment } from "react"
import notFound from "../../Assets/images/notFound.avif"




export default function NotFound(){

   return (
      <Fragment>
         <div className="w-50 m-auto mt-5">
            {/* <img src={notFound} className="w-100 mt-4" onError={() => console.log("Error Download Image Reac Ya MAhmoud")}/> */}
            <img src={notFound} className="w-100 mt-4" alt="notFound" onError={() => console.log("Error Display Image Ya Mahmoud")}/>
            <h1 className="text-center fs-1 mt-5 fw-bold">Not Found Page !</h1>
            {/* <img src={notFound} width={800}/> */}
         </div>
      </Fragment>
   )
}