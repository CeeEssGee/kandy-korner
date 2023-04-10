import { Outlet, Route, Routes } from "react-router-dom";
import { LocationList } from "../locations/LocationList";
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList";
import { NewEmployeeForm } from "../employees/NewEmployeeForm";

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

                <Route path="employee/create" element={ <NewEmployeeForm /> } />
                

            </Route>

        </Routes>
    )
}


