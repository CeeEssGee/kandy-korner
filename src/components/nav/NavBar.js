import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"
import "./NavBar.css"


// Tickets link and logout link + event listener
export const NavBar = () => {

    // get kandy user object out of local storage
    const localKandyUser = localStorage.getItem("kandy_user") // a string
    const kandyUserObject = JSON.parse(localKandyUser) // an object with 2 keys (id and staff)

    if (kandyUserObject.staff) {
        // return employee views
        return <EmployeeNav />
    }
    else {
        // return customer views
        return <CustomerNav />
    }

}

// export const NavBar = () => {
//     const navigate = useNavigate()

//         // get the user object out of local storage
//         const localKandyUser = localStorage.getItem("kandy_user") 
//         const kandyUserObject = JSON.parse(localKandyUser) 

//     return <>
    
//     {
//         kandyUserObject.staff ?
//         <>

//     <ul className="navbar">
//         <li className="navbar__item active">
//             <Link className="navbar__link" to="/locations">Locations</Link>
//         </li>
//         <li className="navbar__item active">
//             <Link className="navbar__link" to="/products">Products</Link>
//         </li>
//         {
//             localStorage.getItem("kandy_user")
//                 ? <li className="navbar__item navbar__logout">
//                     <Link className="navbar__link" to="" onClick={() => {
//                         localStorage.removeItem("kandy_user")
//                         navigate("/", {replace: true})
//                     }}>Logout</Link>
//                 </li>
//                 : ""
//         }
        
//     </ul>

// </>
// :
// <>

// <ul className="navbar">
//     <li className="navbar__item active">
//         <Link className="navbar__link" to="/locations">Locations</Link>
//     </li>

//     {
//         localStorage.getItem("kandy_user")
//             ? <li className="navbar__item navbar__logout">
//                 <Link className="navbar__link" to="" onClick={() => {
//                     localStorage.removeItem("kandy_user")
//                     navigate("/", {replace: true})
//                 }}>Logout</Link>
//             </li>
//             : ""
//     }
    
// </ul>

// </>
//     }
    
    
    
//     </>
// }