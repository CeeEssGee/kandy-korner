import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Purchases.css"

export const MyPurchases = () => {


    const [purchases, setPurchases] = useState([])

    // const [filteredPurchases, setPurchases] = useState([])

    const navigate = useNavigate()
    
    
useEffect(
() => {
    fetch(`http://localhost:8088/purchases?_expand=user&_expand=product`) 
    .then(response => response.json())
    .then((purchaseArray) => {
        setPurchases(purchaseArray)
    
    })

},
[] 
)


    return <>
    <h2>My Orders</h2>

    <article className="purchaseArticle">
    {
        purchases.map(
            (purchase) => {
                const total = (purchase.product.pricePerUnit * purchase.quantity).toLocaleString("en-US", {style: "currency", currency:"USD"})
                const PPU = (purchase.product.pricePerUnit).toLocaleString("en-US", {style: "currency", currency:"USD"})
                return (
                
                <section className="purchaseSection" key={`purchase--${purchase.id}`}>
                <div>Order Number: {purchase.id}</div>
                <div>Item: {purchase.product.name}</div>
                <div>Quantity: {purchase.quantity}</div>
                <div>Price Per Item: {PPU}</div>
                <div>Total Price: {total} </div>
                </section>
                )
            }
        )
    }

    </article>
    </>

    
}