// this will return an input field - to be shown when the customer clicks Find Candy

// from ProductContainer, it does go in as a parameter, but it is all gathered together as a single object - {} - we'll deconstruct it, and this is the name of the key - setterFunction
// now this component (CustomerProductSearch) has access to the setSearchTerms fx on the ProductContainer module/component via the property of setterFunction
// the value of this variable (setterFunction) is now the setterFunction for the state variable in the parent 
// what happens when we invoke that fx on change

export const CustomerProductSearch = ({ setterFunction }) => {
    return (
        <div>
            <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            } 
            type="text" className="customerProductSearch" placeholder="What candy are you looking for?" />
        </div>
    )

}