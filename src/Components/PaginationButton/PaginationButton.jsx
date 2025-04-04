import React, { Fragment } from 'react'

export default function PaginationButton() {
   return (
      <Fragment>
         <div className="container">
            <div className="row my-5">
               <nav aria-label="Page navigation example">
                  <ul className="pagination  justify-content-center">
                     <li className="page-item">
                        <button className="page-link" onClick={()=>getData(-1)}  aria-label="Previous">
                           <span aria-hidden="true">&laquo;</span>
                        </button>
                     </li>
                     <li className="page-item"><button onClick={()=>getData(1)} className="page-link">1</button></li>
                     <li className="page-item"><button onClick={()=>getData(2)} className="page-link">2</button></li>
                     <li className="page-item"><button onClick={()=>getData(3)} className="page-link">3</button></li>
                     <li className="page-item"><button onClick={()=>getData(4)} className="page-link">4</button></li>
                     <li className="page-item"><button onClick={()=>getData(5)} className="page-link">5</button></li>
                     <li className="page-item"><button onClick={()=>getData(6)} className="page-link">6</button></li>
                     <li className="page-item">
                        <button className="page-link" onClick={()=>getData(+1)}  aria-label="Next">
                           <span aria-hidden="true">&raquo;</span>
                        </button>
                     </li>
                  </ul>
               </nav>
            </div>
         </div> 
      </Fragment>   
   )
}
