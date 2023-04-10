import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Products.css"
import { CustomerProduct } from "./CustomerProduct"


export const CustomerProductList = ({ searchTermState }) => {
    
    // reassign useNavigate() hook to navigate to be used later
    const navigate = useNavigate()

    // initial array of products
    const [products, setProducts] = useState([])

    // filtered array to be used by the other arrays
    const [filteredProducts, setFiltered] = useState([])
    

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
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType&_expand=location`)
            .then(response => response.json())
            .then((productArray) => {
                setProducts(productArray)

            })
        },
        [] // empty to observe initial component state
    )

    // need to observe ticket state using useEffect() and what we're looking to observe within the array
    useEffect(
    () => {
        const searchedProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchTermState.toLowerCase())
        })
        setFiltered(searchedProducts)
    },
    [ searchTermState ] //could be blank
    )
        
        return <>
        
            <h2>List of Products</h2>

            {
            <>

            
            <article className="productArticle">
                {
                    filteredProducts.map(product => <CustomerProduct key={`product--${product.id}`}
                        id={product.id} 
                        name={product.name} 
                        pricePerUnit={product.pricePerUnit} />)
                    }
            </article>
        
                    </>
                    
        }

        </>
}
