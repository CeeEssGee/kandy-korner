import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {

    // add correct default properties to the initial state object

    const [product, update] = useState({
        name: "",
        productTypeId: "", 
        pricePerUnit: ""
    })

    const navigate = useNavigate()

    const [productTypes, setProductTypes] = useState([])

    useEffect(
        () =>{
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productTypeArray) => {
                setProductTypes(productTypeArray)
            })
        },
        []
    )

    // const localKandyUser = localStorage.getItem("kandy_user")
    // const kandyUserObject = JSON.parse(localKandyUser)

// when the submit ticket button is clicked - note that it has a parameter, it wants the event - the instructions in this fx will run
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: product.name, // get the product name from the input data
            productTypeId: product.productTypeId, // get the productTypeId from the input data -- how do I make this a drop-down?
            pricePerUnit: product.pricePerUnit, // get the pricePerUnit from the input data
            // locationId: 1 // leave this blank -- do I need this?
            // JSON will add an id for us

        }

        // Fetch just the product list - because that is where we are posting our new products?
    return fetch(`http://localhost:8088/products?_expand=productType`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productToSendToAPI)
    })
    .then(response => response.json())
    .then(() => {
        navigate("/products") // where are we sending the user after submitting the ticket, we got this from the application form - rout path: products
        // <Route path="products" element={ <ProductList /> } />

    })
    }

    return (
        <>
        <form className="productForm">
            <h2 className="productForm__title">New Product Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="product-name">Product Name</label>
                    {/* input for our product name, need default values in our initial state */}
                    <input
                    required autoFocus type="text"
                    className="form-control"
                    placeholder="New Product Name"
                    value={product.name}
                    onChange={
                        (evt) => {
                           // first, we need to copy the existing state, this uses the shorthand for copying an object
                           const copy = { ...product }
                           // modify the copy with new value of description from the change event, evt.target.value = whatever is in the input field
                           copy.name = evt.target.value
                           // now that we've captured the input, we need to update the state
                           update(copy)  
                        }
                    } />
                </div>
            </fieldset>            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="product-price">Product Price:</label>

                    <input 
                        required autoFocus type="number"
                        className="form-control"
                        placeholder="Product Price"
                        value={product.pricePerUnit}
                        onChange={
                            (evt) => {
                                // first, we need to copy the existing state, this uses the shorthand for copying an object
                                const copy = { ...product }
                                // modify the copy with new value of emergency from the change event, evt.target.checked = if checked, true / not, false
                                copy.pricePerUnit = parseFloat(evt.target.value)
                                // now that we've captured the input, we need to update the state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="product-type">Product Type:</label>
                    <select
                        onChange={
                            (evt) => {
                                // first, we need to copy the existing state, this uses the shorthand for copying an object
                                const copy = { ...product }
                                // modify the copy with new value of emergency from the change event, evt.target.checked = if checked, true / not, false
                                copy.productTypeId = parseInt(evt.target.value)
                                // now that we've captured the input, we need to update the state
                                update(copy)
                            }
                        } >
                        <option key={0}>Choose a product type</option>
                        {
                            productTypes.map(
                                (type) => {
                                    return ( 
                                <option key={type.id} value={type.id}>
                                    {type.category}
                                </option>
                            ) 
                        })}
                        </select>
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Product
            </button>
        </form>
        </>
    )

}