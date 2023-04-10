import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";


export const CustomerProductDetails = () => {
// productId is the state we are getting from the Route, and we want to observe when that state changes, so we need a useEffect
    const {productId} = useParams
    const [product, updateProduct] = useState()

    // need to observe ticket state using useEffect() and what we're looking to observe within the array
    useEffect(
    () => {
        fetch(`http://localhost:8088/products?_expand=productType&_expand=location&productId=${productId}`) 
        .then(response => response.json())
        .then((data) => {
            const singleProduct = data[0]
            updateProduct(singleProduct)
        })
    },
    [productId] 
    )
    
    return <section className="productSection">
                <header>{product?.name}</header>
                <div>Price: {product?.pricePerUnit?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>                                
                <div>Location: {product?.location?.name}</div>
                <div>Address: {product?.location?.address}</div>
            </section>
}