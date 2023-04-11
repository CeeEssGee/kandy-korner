import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Employees.css"

export const EmployeeList = () => {

    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFiltered] = useState([])

    useEffect(
        () => {
            setFiltered(employees)
        },
        [employees]
    )

    useEffect(
    () => {
    fetch(`http://localhost:8088/employees?_expand=user&_expand=location`) 
    .then(response => response.json())
    .then((employeeArray) => {
        setEmployees(employeeArray)
    })
    },
    [] 
    )

    return <>
    
    <h2>List of Employees</h2>
    <button onClick={() => {navigate("/employee/create")}}>Add New Employee</button>

    <article className="employeeArticle">
        {
            filteredEmployees.map(
                (employee) => {
                    return <section key={employee.id}
                    className="employeeSection">
                        <header>{employee.user.fullName}</header>
                        <div>{employee.location.name}</div>
                        <div>{employee.startDate}</div>
                    </section>
                }
            )
        }

    </article>
    </>
}