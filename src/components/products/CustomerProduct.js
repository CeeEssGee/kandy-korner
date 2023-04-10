export const CustomerProduct = ({}) => {
    return <section key={product.id} className="productSection">
                                <header>{product.name}</header>
                                <div>Price: {product.pricePerUnit.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>                                
                                <footer>Show me where</footer>

                                {/* <div>Location: {product.location.name}</div> */}
                                {/* <div>Address: {product.location.address}</div> */}
                            </section>
}