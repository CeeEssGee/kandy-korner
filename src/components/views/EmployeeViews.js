import { Outlet, Route, Routes } from "react-router-dom";
import { LocationList } from "../locations/LocationList";
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList";

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="title--main">Kandy Korner Shoppe</h1>
                    <div>Sweets for All</div>

                    <Outlet />
                </>
            }>
                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
                <Route path="product/create" element={ <ProductForm /> } />
                {/* had to let this LocationForm autocomplete in order to work */}
                {/* <Route path="location/create" element={ <LocationForm /> } /> */}

            </Route>

        </Routes>
    )
}


