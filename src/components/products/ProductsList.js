import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css"


export const ProductList = () => {
    
    // reassign useNavigate() hook to navigate to be used later
    const navigate = useNavigate()

    // get the user object out of local storage
    const localKandyUser = localStorage.getItem("kandy_user") 
    const kandyUserObject = JSON.parse(localKandyUser) 

    // initial array of products
    const [products, setProducts] = useState([])

    // filtered array to be used by the other arrays
    const [filteredProducts, setFiltered] = useState([])
    
    // products greater than $2 - this resets the default to false
    const [topPriced, setTopPriced] = useState([false])

    // customers didn't see the list of products when I used filteredProducts, so we created a version of filteredProducts that returned all the products
    useEffect(
        () =>{
            setFiltered(products)
        },
        [products]
    )
    
    
    useEffect(
        () =>{
            // console.log("Initial State of Products", products)
            // add ?_sort=user,views&_order=desc,asc
            // get the productType using _expand ??
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
            .then(response => response.json())
            .then((productArray) => {
                setProducts(productArray)

            })
        },
        [] // empty to observe initial component state
    )


    
    // to filter top priced products, we need to run some code when the top priced button is clicked
    useEffect(
        () =>{
            if (topPriced) {
                const topPricedProducts = products.filter(product => product.pricePerUnit > 2 === true)
                setFiltered(topPricedProducts)
            }
            else {
                setFiltered(products)
            }
        },
        [topPriced]
        )
        
        return <>
        
            <h2>List of Products</h2>

            {
            kandyUserObject.staff ?
            <>
            <button onClick={() => {setTopPriced(false)}}>All Products</button>
            <button onClick={() => {setTopPriced(true)}}>Top Priced</button>
            <button onClick={() => {navigate("/product/create")}}>Add Product</button>
            <article className="productArticle">
                {
                    filteredProducts.map(
                        (product) => {
                            return <section key={product.id} className="productSection">
                                <header>{product.name}</header>
                                <div>{product.pricePerUnit}</div>
                                <div>{product.productType.category}</div>
                            </section>
                        }
                        )
                    }
            </article>
        
                    </>
        
            : ""
        }

        </>
}
