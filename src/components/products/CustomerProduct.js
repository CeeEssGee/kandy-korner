import { Link } from "react-router-dom"
import "./Products.css"

// child of CustomerProductList

export const CustomerProduct = ({ id, name, pricePerUnit }) => {
    return <section className="productSection">
        <header>{name}</header>
        <div>Price: {pricePerUnit.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
        <footer >
            <div className="footerDiv">
                <Link to={`/products/${id}`}>Click for More Details</Link>
            </div>
        </footer>

        {/* <div>Location: {product.location.name}</div> */}
        {/* <div>Address: {product.location.address}</div> */}
    </section>
}