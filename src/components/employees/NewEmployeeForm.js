import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewEmployeeForm = () => {

    /*
    user.id (assigned by JSON)
    user.fullName
    user.email
    user.isStaff = true
    employeed.id (assigned by JSON)
    employee.userId (auto assigned)
    employee.startDate
    employee.payRate
    employee.locationId
    */

    const [user, updateUser] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })

    const [employee, updateEmployee] = useState({
        startDate: "",
        payRate: "",
        locationId: ""
    })

    const navigate = useNavigate()

    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)

                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const employeeToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: user.isStaff,
            startDate: employee.startDate,
            payRate: employee.payRate,
            locationId: employee.locationId
        }

        return fetch(`http://localhost:8088/employees?_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/employees")
            })
    }

    return (
        <>
            <form className="newEmployeeForm">
                <h2 classForm="newEmployeeForm__title">New Employee Form</h2>

                {/* user.fullName fieldset */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="employee-name">Employee Full Name</label>
                        <input required autoFocus type="text" className="form-control" placeholder="First and Last Name" value={user.fullName} onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.fullName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                    </div>
                </fieldset>

                {/* user.fullName fieldset */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="employee-email">Employee Email Address</label>
                        <input required autoFocus type="text" className="form-control" placeholder="Email Address" value={user.email} onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                    </div>
                </fieldset>


{/* code from courtney.js */}

                <button 
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                        Save Employee
                </button>
            </form>
        </>
    )
}