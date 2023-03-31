import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { LocationList } from "../locations/LocationList";
import { ProductList } from "../products/ProductsList";

export const ApplicationViews = () => {
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

                {/* had to let this LocationForm autocomplete in order to work */}
                {/* <Route path="location/create" element={ <LocationForm /> } /> */}

            </Route>

        </Routes>
    )
}





// export const ApplicationViews = () => {
// 	return <>

// 	</>
// }

