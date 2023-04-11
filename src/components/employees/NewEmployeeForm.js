import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewEmployeeForm = () => {


    const [user, updateUser] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })

// Don't need and will mess it up
    // useEffect(
    // () => {
    //     fetch(`http://localhost:8088/users?_isStaff=true`) 
    //     .then(response => response.json())
    //     .then((userArray) => {
    //         updateUser(userArray)
    //     })
    // },
    // []
    // )

    // updateEmployee = setter
    // employee = applicationState.employee
    const [employee, updateEmployee] = useState({
        startDate: "",
        payRate: "",
        locationId: "",
        userId: 0
    })

// Don't need and will mess it up
    // useEffect(
    // () => {
    //     fetch(`http://localhost:8088/employees`) 
    //     .then(response => response.json())
    //     .then((employeeArray) => {
    //         updateEmployee(employeeArray)
    //     })
    // },
    // [] 
    // )

    const navigate = useNavigate()

    const [locations, updateLocation] = useState([])

    useEffect(
        () => {
            // getter = fetch - can use to get and set state at once
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    updateLocation(locationArray)

                })
        },
        [] // where the state is watching state change, and upon change, re-render - only looking at locations in this case
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        const userToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: user.isStaff,
        }

        const employeeToSendToAPI = {
            startDate: employee.startDate,
            payRate: employee.payRate,
            locationId: employee.locationId,
            userId: employee.userId
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        }) 
        .then(response => response.json())
        // save the response.json as a variable
        .then((selectedUser) => {
            // save the employee array as a variable
            const copy = { ...employeeToSendToAPI }
            // add the selected userId to the employee array
            copy.userId = selectedUser.id

        return fetch(`http://localhost:8088/employees?_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/employees")
            })
        })

    }

    return (
        <>
            <form className="newEmployeeForm">
                <h2 className="newEmployeeForm__title">New Employee Form</h2>

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



{/* employee.startDate fieldset */ }
<fieldset>
    <div className="form-group">
        <label htmlFor="employee-startDate">Employee Start Date</label>
        <input required autoFocus type="date" className="form-control" placeholder="Employee Start Date" value={employee.startDate} onChange={
            (evt) => {
                const copy = { ...employee }
                copy.startDate = (evt.target.value)
                updateEmployee(copy)
            }
        } />
    </div>
</fieldset>

{/* employee.payRate fieldset */ }
<fieldset>
    <div className="form-group">
        <label htmlFor="employee-payRate">Employee Pay Rate</label>
        <input required autoFocus type="number" className="form-control" placeholder="Employee Pay Rate" value={employee.payRate} onChange={
            (evt) => {
                const copy = { ...employee }
                copy.payRate = parseFloat(evt.target.value)
                updateEmployee(copy)
            }
        } />
    </div>
</fieldset>

{/* employee.locationId fieldset */ }
<fieldset>
    <div className="form-group">
        <label htmlFor="employee-location">Employee Location</label>
        <select onChange={
            (evt) => {
                const copy = { ...employee }
                copy.locationId = parseInt(evt.target.value)
                updateEmployee(copy)
            }
        } >
            <option key={0}>Choose a location</option>
            {
                locations.map(
                    (location) => {
                        return (
                            <option key={location.id}
                                value={location.id}>
                                {location.name}
                            </option>
                        )
                    }
                )
            }
        </select>


    </div>
</fieldset>



                <button 
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                        Save Employee
                </button>
            </form>
        </>
    )
}