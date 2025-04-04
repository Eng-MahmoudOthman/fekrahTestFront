import { createContext , useState } from "react";




export let UserContext = createContext();


export default function UserContextProvider(props){


   const [loggedUser , setLoggedUser] = useState("") ;
   const [admin , setAdmin] = useState(false) ;
   const [moderator , setModerator] = useState(false) ;
   const [userToken , setUserToken] = useState("") ;
   const [error , setError] = useState(null) ;
   const [loading , setLoading] = useState(false)
   const [role , setRole] = useState("")



   



   return (
      <>
         <UserContext.Provider value={{role , setRole , loggedUser , setLoggedUser , userToken , setUserToken , admin , setAdmin , moderator , setModerator  , error , setError , loading , setLoading }}>
            {props.children}
         </UserContext.Provider>
      </>
   )
}