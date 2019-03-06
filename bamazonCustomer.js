// Require statements
const mysql = require('mysql');
const inquirer = require('inquirer');
const products = require('./product.js');

// Variable declarations
const item = response.id;
const quantity = response.quantity;
const customerTotal = item * quantity;
const updatedStock = stock - response.quantity;

// Connect to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'bamazon'
});
connection.connect(err => {
    if(err) throw err;
    console.log(`Connected as ID ${connection.threadId}\n`);
    displayProducts();
    start();
});

// Display products from database (id, name, price)
displayProducts();

// Start app
function start() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the ID of the item you would like to purchase.'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?'  
        }
    ]).then(function() {
        // Does store have enough inventory to meet customer's request?
        if(response.quantity > this.stock) {
            // NO: Prevent the order from going through
            console.log(`We apologize for the inconvenience, but only ${this.stock} remain`);
        // YES: Fulfill the customer's order.
        } else {
            // Update quantity in SQL database
            updateDB();
            // Once updated, display total cost of purchase
            displayTotal();
        }
    });
}

function displayProducts() {
    connection.query('SELECT * FROM products', (err, response) => {
        if(err) throw err;
        console.log(response);
        connection.end();
    });
}

function updateDB() {
    connection.query(`
    UPDATE products 
    SET stock_quantity = ${updatedStock} 
    WHERE item_id = ${response.id}
    `);
}

function displayTotal() {
    for (i = 0; i ; i++) {
        customerTotal += i;
    }
    console.log(`Your total is ${customerTotal}`);
}