import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";


export const CustomerProductDetails = () => {
    // productId is the state we are getting from the Route, and we want to observe when that state changes, so we need a useEffect
    const { productId } = useParams()
    const [product, updateProduct] = useState()


    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType&_expand=location&id=${productId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleProduct = data[0]
                    updateProduct(singleProduct)
                })
        },
        [productId]
    )

    // Ch 16 bring in kandy user info so we'll have userId and staff data
    const localKandyUser = localStorage.getItem("kandy_user") // a string
    const kandyUserObject = JSON.parse(localKandyUser) // an object with 2 keys (id and staff)

    const [purchase, updatePurchase]= useState({
        quantity: "",
        // locationId: 0
    })

    const navigate = useNavigate()
    const handleSaveButtonClick = (event) => {
              event.preventDefault()
        /*
            Ch 16 purchases sample object
        purchases
            {
            "id": 1,
            "userId": 2,
            "quantity": 3,
            "locationId": 1,
            "productId": 1
            }   
        */

        const purchaseToSendToAPI = {
            userId: kandyUserObject.id,
            quantity: purchase.quantity,
            locationId: product.locationId,
            productId: product.id
        }

        return fetch(`http://localhost:8088/purchases`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseToSendToAPI)
        }) 
        .then(response => response.json())
        .then(() => {
            navigate(`/products`)
            // maybe add  at the end?
        })
    }

    return <section className="productSection">
        <header>{product?.name}</header>
        <div>Price: {product?.pricePerUnit?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
        <div>Location: {product?.location?.name}</div>
        <div>Address: {product?.location?.address}</div>

{/* Ch 16 - add a form */}
    <form className="candyForm">
        <fieldset>
            <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                required autoFocus
                type="number"
                className="form-control"
                placeholder="Enter quantity"
                value={purchase.quantity}
                onChange={(evt) => {
                    const copy = { ...purchase }
                    copy.quantity = parseInt(evt.target.value)
                    updatePurchase(copy)
                }} />
            </div>
        </fieldset>

    </form>

        {/* Ch 16 add a button */}
        <footer className="footerDiv">
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="purchaseBtn">Purchase</button>
        </footer>
    </section>
}