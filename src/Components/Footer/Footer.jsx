import { Fragment } from "react";
import { Link } from "react-router-dom";


export default function Footer(){


   return (
      <Fragment>
         <footer className="footer my-5 py-3 text-white text-center">
            <div className="container p-4 ">
               <h4 className=" h1 fw-bold text-center mb-2">Fekra Medical </h4>
               <div className="row">

                  <div className="col-md-12">
                     <p className="footer-info fs-sm">
                        أول منصة إلكترونية مجانية شاملة ومتخصصة في تقديم جميع 
                        الخدمات الطبية بنظام الحجز والدفع الإلكتروني، رغبة منا في المساهمة
                        في خفض تكاليف الخدمة وتحسين مستوى أداء الخدمة الطبية في مصر
                     </p>
                  </div>

                  <div className="row mt-4">

                     <div className="hstack gap-3 col-md-6">
                        <input className="form-control me-auto" type="text" placeholder="Add your Notes here..." aria-label="Add your item here..." />
                        <div className="vr" />
                        <button type="button" className="btn btn-sm btn-danger ">Submit</button>
                     </div>


                     <div className="col-md-6 d-flex justify-content-center align-items-center parentIcon">

                        <Link className="cartIconFooter ">
                           <i className="fa-brands  fa-facebook"></i>
                        </Link>

                        <Link  className="cartIconFooter">
                           <i className="fa-brands  fa-twitter"></i>
                        </Link>
                        <Link  className="cartIconFooter">
                           <i className="fa-brands  fa-telegram"></i>
                        </Link>
                        <Link  className="cartIconFooter">
                           <i className="fa-brands  fa-instagram"></i>
                        </Link>

                     </div>


                  </div>
                  
               </div>
            </div>
            <p className=" p-2 m-0 bg-black developer">CopyRight &copy; Developed By : <Link className="main-color" to={"#"}>Mahmoud Othman</Link>   &   UI/UX Design By : <Link className="main-color" to={"#"}>Eman Magdy</Link> </p>
         </footer>
      </Fragment>
   )
}