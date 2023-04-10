import { Link } from "react-router-dom"
// child of CustomerProductList

export const CustomerProduct = ({ id, name, pricePerUnit }) => {
    return <section className="productSection">
    <header>{name}</header>
    <div>Price: {pricePerUnit.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>                                
    <footer>
        <Link to={`/products/${id}`}>Show me where</Link>
        </footer>

    {/* <div>Location: {product.location.name}</div> */}
    {/* <div>Address: {product.location.address}</div> */}
</section>
}