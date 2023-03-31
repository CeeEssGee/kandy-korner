import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css"


export const ProductList = () => {

    // initial array of products
    const [products, setProducts] = useState([])

    // reassign useNavigate() hook to navigate to be used later
    const navigate = useNavigate()

    useEffect(
        () =>{
            console.log("Initial State of Products", products)
            // add ?_sort=user,views&_order=desc,asc
            fetch(`http://localhost:8088/products?_sort=name`)
            .then(response => response.json())
            .then((productArray) => {
                setProducts(productArray)

            })
        },
        [] // empty to observe initial component state
    )

        return <>
        
            <h2>List of Products</h2>

            <article className="productArticle">
                {
                    products.map(
                        (product) => {
                            return <section key={product.id} className="productSection">
                                <header>{product.name}</header>
                                <div>{product.pricePerUnit}</div>
                            </section>
                        }
                    )
                }
            </article>
        
        
        </>
}
