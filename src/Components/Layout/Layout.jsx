import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Offline, Online } from "react-detect-offline";
import { Fragment } from "react";
import notConnection from "../../Assets/images/not-connection.png"

export default function Layout({socket}){
   return (
      <Fragment>
         <Navbar socket={socket}/>

         <Outlet></Outlet>
         
            <Offline>
               <div className="network text-danger">
                  <img src={notConnection} alt="not-Connection"/>
               </div>
            </Offline>

         {/* <Offline>
            <div className="network text-danger">
               <i className="fa-solid fa-wifi p-1 "></i> Network Offline
            </div>
         </Offline> */}

         {/* <Online>
            <div className="network fixed-bottom text-success">
               <i className="fa-solid fa-wifi p-1 "></i> Network Online
            </div>
         </Online> */}
         
         <Footer/>
      </Fragment>
   )
}