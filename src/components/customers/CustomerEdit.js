import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Customers.css"


export const CustomerEdit = () => {


    const [customer, editCustomer] = useState({
         loyaltyNumber: ""
    })

    const navigate = useNavigate()
    const { customerId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&?id=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const customerArray = data[0]
                    editCustomer(customerArray)

                })
        },
        [customerId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const toBeSavedToAPI = {
            loyaltyNumber: customer.loyaltyNumber,
            userId: customer.userId,
            address: customer.address,
            phoneNumber: customer.phoneNumber
        }

        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toBeSavedToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/customers")
            })
    }

    return <>
        <h2 className="customerInformationForm__title">Edit Customer Information</h2>
        <section className="customerSection">
        <header>Name: {customer?.user?.fullName}</header>
        <div>Email: {customer.user?.email}</div>


        <form className="customerInformationForm">            
        <fieldset>
            <div className="form-group">
                <label htmlFor="loyaltyNumber">Loyalty Number:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    value={customer.loyaltyNumber}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.loyaltyNumber = parseInt(evt.target.value)
                            editCustomer(copy)
                        }
                    }>{customer.loyaltyNumber}</textarea>
            </div>
        </fieldset>
                    <button 
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="updateLoyaltyBtn">Update Loyalty Number</button>
        </form>
        </section>
    </>
}