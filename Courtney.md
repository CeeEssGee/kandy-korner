1.  Followed setup instructions
2.  In your JSON file, create the following resources.
        users: Where basic user information for all users is stored (name and email)
        customers: The people who make candy purchases at your stores. Stores additional loyaltyNumber property which is a 5 digit number. Customers can make purchases from any store.
        employees: Stores additional startDate and payRate properties in addition to what's in the users table. Employees can only be assigned to work at a single store.
        locations: The physical location of your stores. Record the address and square footage of a location.
        products: All of the different candies that you sell in your stores. A single product can be sold in multiple stores, depending on demand. Store the name of the product, its type, and its price per unit.
        productTypes: All of your candies fall into categories (e.g. hard candies, chocolates, gummies, etc...)
        purchases: When a customer purchases candy at a store, a record of the transaction should be created. A purchase should record the customer that purchased it, which product was purchased, and how many of that product was purchased (e.g. a customer can buy 5 Snickers bars in a single purchase).
3.  Create ERD - reviewed with Alex and Nic
4.  database.json
        Added sample data for each item in the ERD
        Added additional locations
5.  In terminal
        navigated to kandy-api: json-server -p 8088 database.json
        navigated to kandy-korner: npm start
            displays - Edit src/App.js and save to reload
<!-- My initialization did not give boilerplate code -->
6.  Login.js
        updated line 7 so it will automatically show an employee email upon rendering
7.  NavBar.js
        Replaced boilerplate code with the code I had written
8.  ApplicationView.js
        Replaced boilerplate code with the code I had written
9.  LocationList.js
        Added LocationList.js code
        A list of locations can be seen by customers and employees.
        Add a navbar item that both kinds of users can click on.
        When clicked, display a list of locations. Display the address and the square footage. Use any layout and colors that you want.
<!-- Works for both employees and customers -->
10. database.json
        Create several types of candies in productTypes
11. database.json
        Create several candies in products
12. NavBar.js
        Added Products link to the NavBar
13. ProductsList.js
        created ProductList function
14. ApplicationViews.js
        Added Route for ProductList
<!-- We can see a list of products upon clicking the link -->
15. ProductsList.js
        Need to add logic to sort alphabetically
                updated fetch address to http://localhost:8088/products?_sort=name
<!-- We can see a list of alphabetized products -->
16. ProductsList.js
        Add a button 
        logic so only expensive ones will show on push of button
        will need to use a filteredProducts - so set that up first
        had to set up a useEffect that returned all products as setFiltered(products) in order to keep from getting errors because we didn't have these filtered off EE's and customers like Honey Rae's yet
                useEffect(
                        () =>{
                                setFiltered(products)
                        },
                        [products]
                )
<!-- Works -->
The above works for customer and employees, needs to work for employees only
<!-- Works for customers and employees -->
17. ProductsList.js
        Fixed so only employees can see the Top Priced Products and All products buttons
<!-- Works for employees only now -->
18. ProductsList.js
        Work on getting the types to show on product list using _expand=
        not a key but a singular (not plural) item in the database where we have a foreign key that matches
        http://localhost:8088/products?_sort=name&_expand=productType
<!-- Works for customers and employees -->
19. NavBar.js 
        Tweaked so Products link only shows for Employees
<!-- Products link only shows for employees now -->

Create a form for creating a new product. Only employees can add new products. There should be a form field for the following properties.

Product name
Product type
Price
Once the POST operation is complete, navigate the employee to the listing of all products.

Add a button - Add Product
        Fields for:
                Product name
                Product type
                Price
        Save
        Navigate to list of all products
Use a POST request

20. Create ProductForm.js
        Export ProductForm fx 
        There are some issues with my function
ProductsList.js
        Add Product Button
ApplicationViews.js
        Route Path for product/create        
<!-- Saves a new candy without a locationId -->
21. ProductForm.js
        useEffect - fetch productTypes
            const [productTypes, setProductTypes] = useState([])
        for product type onChange, change input to select, remove type, className, placeholder and value
        <option key={0}>Choose a product type</option>
                        {
                            productTypes.map(
                                (type) => {
                                    return ( //why do these parentheses need to be here
                                <option key={type.id} value={type.id}>
                                    {type.category}
                                </option>
                            ) //why do these parentheses need to be here
                        })}
        This gives me a dropdown for product types!!!
        Changed parseInt to parseFloat for the price
        updated price to pricePerUnit at the top
<!-- It works!!! -->
Fix my nav bar with CustomerNav and EmployeeNav
        Created EENav and CustNav
        Create EEViews and CustViews
        Updated ApplicationViews
<!-- It works!!! -->
21. Add location drop-down to product form
ProductForm.js
        added locationId: product.locationId to my productToSendToAPI fx and 
        added
                const [locations, setLocations] = useState([])
                useEffect and fetch for locations
        Added the fieldset with event handler
<!-- It works! -->
22.     Given a customer wants to find a specific candy

        When a customer clicks on a "Find Candy" navigation link

        Then the customer should be presented with a view that displays a text input field, with a label of "What candy are you looking for?"

When logged in as a customer, 
<!-- CustomerProductContainer.js -->
        Created and exported ProductContainer
<!-- CustomerProductSearch.js -->
        Created and exported CustomerProductSearch with an input field
<!-- CustomerProductList.js -->
        Copied and tweaked ProductList.js
        added searchTermState param to CustomerProductList fx
        added useEffect so CustomerProductList will display list of products upon searched terms - or do I need to duplicate this for customers?
<!-- CustomerViews.js -->
        Link for Find Candy (named the page /products-customer)
<!-- CustomerNav.js -->
        <li className="navbar__item active">
                <Link className="navbar__link" to="/products-customer">Find Candy</Link>
        </li>       
<!-- It works! -->
9.1.1   Re-naming the CustomerProductDetails => CustomerProductList
9.1.1   Creating CustomerProduct.js - a child of CustomerProductList.js
<!-- It works! -->
9.1.2   Getting the Show me where link to work
1.      CustomerViews.js
Added a Route for products-customers/:productId that takes us to <></>
2.      Create CustomerProductDetails.js
3.      CustomerViews.js
Update the Route and have it take us to CustomerProductDetails (make sure that it gets imported)
<!-- It works!!! BUT none of my candies are sold at multiple stores -->
<!-- 2-9-11 Kandy Korner Employees -->
Create a form for hiring employees. You must be able to choose a location when filling out the form. An employee should have the following information provided.
- Name (string)
- Location (foreign key)
- Start date (date)
- Pay rate per hour (number)
This will require two POST requests.
- Create an object in users
- Create an object in employees with a userId that you captured from the response in the previous step
When the saving process is complete, redirect the user to the /employee route to see a list of all employees.
Make sure that each employee HTML representation displays the name of the location in which she works instead of the foreign key. Use the _expand query string parameter to include the employee's full location object.
1.      Create employees directory
2.      Create NewEmployeeForm.js
<!-- 4/10/2022 -->
I have a form that accepts full name and email. When you save the employee, it creates a new employee object. 
There is code on the Courtney.js that needs to be incorporated on the NewEmployeeForm.js
The NewEmployeeForm.js needs major tweaking. 
<!-- It works!! -->

<!-- 2-12-1 Kandy Korner Customers -->
        Given an employee wants to see all customers
        When the employee clicks on a "Customers" navigation link
        Then all customers should be listed with the customer name and email
Might as well skip and do the next one...
<!-- 2-12-2 Kandy Korner Customers -->
        Given an employee is viewing all customers
        When the employee clicks on the name of a customer
        Then a detail view should be displayed that shows the customer name, email, and loyalty number
customers directory
CustomerList.js
        need to create customers page/route
CustomerDetails.js
<!-- It works!!! -->

<!-- Ch 14 - Replace Loyalty Card -->
<!-- Ch 14 a -->
        Given a customer needs a new loyalty ID number
        When an employee views a list of all customers
        Then the customer name should be a hyperlink that can be clicked on
<!-- This already works ⬆👆 -->

<!-- Ch 14 b and c-->
        Given an employee is viewing a list of customers
        When the employee clicks on a customer name
        Then a form should appear with a text input field showing the customer's current loyalty ID and a button labeled "Update"
        Given an employee has changed the value of a customer's loyalty ID in the edit form
        When the employee clicks the "Update" button
        Then the new loyalty ID should be saved to the API
CustomerEdit.js
        create and export CustomerEdit fx, return fragment
        I'm going to repurpose CustomerDetails.js for this...
CustomerList.js
        Edit the Link to be: {`/customers/${customer.id}/edit`}
EmployeeViews.js
        Edit the Route to be CustomerEdit instead of CustomerDetails
CustomerEdit.js
        Reformat the JSX 
        Button added
<!-- It works! -->

<!-- Ch 16 -->
CustomerProduct.js
        Add a purchase button
        Bring in the kandy user login info
        useNavigate()
        handleSaveButtonClick
        Create an object to be saved to the API

TODO
What do we currently have on this component
        productId


Ordering Candy
In this chapter, you need to allow a customer to purchase candy. Add a "Purchase" button next to each product when it is rendered. When the customer clicks on that button, you need to store a new object with the correct information in the purchases table in your database.

Displaying Orders
Once you have the objects saving to the database, you need to put a new link in your NavBar component labeled "My Orders". When the user clicks on it, a list of all candies that the user wants to purchase should be listed.

Display the candy name and the price of the candy.

Just get them all listed on the page first, knowing that there will be duplicates if the user clicked on a single candy multiple times.








<!-- QUESTIONS -->
Ch 16 - ProductForm - navigate("/customer-products") - not working



<!-- NOTES -->

