# Bamazon
An Amazon-like CLI storefront that takes in orders from customers and depletes stock from the store's inventory.

To use this application, you will need to npm install MySQL and Inquirer. Be sure to run the following lines in node.js:
* `<npm init>`
* `<npm i mysql>`
* `<npm i inquirer>`

Additionally, you can use a table formatting package like console.table to improve the readability of your table.

## Bamazon Customer
As a valued Bamazon **customer**, you can view all of our wonderful products.
Select your desired item and quantity to checkout.

Upon running bamazonCustomer.js, you will immediately see a table of the available products.

![Table of available products, prompt, and message](images/img-1.png)

You will also be prompted to enter a number corresponding to the ID of the item you wish to purchase. You will then be asked to enter the quantity of said item that you wish to purchase.

![Alternate message if user selects No for confirm](images/img-2.png)

The third and final prompt will confirm your selection before purchase. If you enter `<Y>` (yes), you will get a message saying that your order will be delivered soon before the application closes. If you choose `<n>` (no), you will get a different message saying that we're sorry you changed your mind, and the application will close. 

## Bamazon Manager
As a **manager**, you can view and manage the inventory of the available products. 

You will first be prompted with a list of choices to view available products, view low inventory, add to inventory, add new product, or exit application.

![List of choices](/images/img-3.png) 

If you select `<View Available Products>`, the application will display a table of the available products, including the item id, product name, price (USD), and stock quantity. 

![View available products](/images/img-4.png)

If you choose `<View Low Inventory>`, the application will display a table that is populated only with items that have fewer than 5 units remaining. This time, only the item id, product name, and stock quantity will be shown.

![View low inventory](/images/img-5.png)

If you select `<Add to Inventory>`, you will be prompted to answer two questions. The first will ask for the item ID. The second will ask how many of that item you would like to add. This will update the database accordingly.

![Add to inventory](/images/img-6.png)

If you choose `<Add New Product>`, you will be prompted with a series of questions to enter the new product's name, department, price per item, and initial stock quantity. 

![Add new product](/images/img-7.png)

If you select `<Exit>`, the application closes.

![User selected 'Exit'](/images/img-8.png)


### Bamazon Supervisor
**Coming soon!**

As a **supervisor**, you will be able to view and manage Bamazon's departments.


#### View portfolio: file:///C:/Users/ragsd/leaf-junkie.github.io/portfolio.html