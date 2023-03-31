import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Locations.css"

export const LocationList = () => {

    // initial array of locations
    const [locations, setLocations] = useState([]) 

    // reassign useNavigate() hook to navigate to be used later
    const navigate = useNavigate()

    // !!! probably need to do more to make this work
    // const localKandyUser = localStorage.getItem("kandy_user")
    // const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () =>{
        // console.log("Initial State of Locations", locations)

            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
                setLocations(locationArray)
                // console.log(locationArray);
                
            })


        },
        [] // empty to observe initial component state
    )

        return <>

            <h2>List of Locations</h2>

            <article className="locationArticle">
                {
                    locations.map(
                        (location) => {
                            return <section key={location.id} className="locationSection">
                                <header>{location.name}</header>
                                <div>Address: {location.address}</div>
                                <div>Square Footage: {location.squareFootage}</div>
                            </section>
                        }
                    )
                }
            </article>
            </>   
}