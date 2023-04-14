import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Customers.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    // const [filteredCustomers, setFiltered] = useState([])

    // useEffect(
    // () => {
    //     setFiltered(customers)
    // },
    // [customers] 
    // )

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&isStaff=false`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)

                })
        },
        []
    )

    return <>

        <h2>List of Customers</h2>
        {/* <button onClick={() => {navigate("/customer/create")}}>Add New Customer</button> */}

        <article className="customers">
            {
                customers.map(
                    (customer) => {
                        return <section key={customer.id} className="customerSection">
                            <header>
                                <Link to={`/customers/${customer.id}/edit`}>{customer.user.fullName}</Link>
                            </header>
                        </section>
                    }




                )
            }

        </article>

    </>

}