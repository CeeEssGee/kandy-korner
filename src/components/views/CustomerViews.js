import { Outlet, Route, Routes } from "react-router-dom";
import { LocationList } from "../locations/LocationList";
import { CustomerProductContainer} from "../products/CustomerProductContainer";
import { CustomerProductDetails } from "../products/CustomerProductDetails";
import { CustomerProductList } from "../products/CustomerProductList";


export const CustomerViews = () => {
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

                <Route path="customer-products" element={ <CustomerProductContainer /> } />
                <Route path="customer-products" element={ <CustomerProductList /> } />
                <Route path="products/:productId" element={ <CustomerProductDetails /> } />

                {/* had to let this LocationForm autocomplete in order to work */}
                {/* <Route path="location/create" element={ <LocationForm /> } /> */}

            </Route>

        </Routes>
    )
}



