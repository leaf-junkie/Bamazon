const mysql = require("mysql");
const inquirer = require("inquirer");
const products = require("./product.js");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "bamazon"
});

connection.connect(err => {
    if(err) throw err;
    console.log(`Connected as ID ${connection.threadId}\n`);
    displayProducts();
    start();
});

// Display products from database (id, name, price)
function displayProducts() {
    connection.query("select * from products", (err, response) => {
        if(err) throw err;
        console.log(response);
        connection.end();
    });
}

function start() {
    // Prompt user
    inquirer
    .prompt([
        // The first should ask them the ID of the product they would like to buy
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the ID of the item you would like to purchase.'
        },
        // The second message should ask how many units of the product they would like to buy
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?'  
        }
    ]).then(function() {
        // Check if store has enough of the product to meet the customer's request
        if(response.quantity > this.stock) {
            // If not, log a phrase like Insufficient quantity! and prevent the order from going through
            console.log(`We apologize for the inconvenience, but only ${this.stock} remain`);
        // However, if your store does have enough of the product, you should fulfill the customer's order.
        } else {
            // Update quantity in SQL database
            UPDATE products 

            // Once updated, display total cost of purchase
            const item = response.id;
            const quantity = response.quantity;
            const total = item * quantity;

            for (i = 0; i ; i++) {
                total += i;
            }
            console.log(`Your total is ${total}`);
        }
    });
}