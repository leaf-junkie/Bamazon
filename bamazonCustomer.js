// Require statements
const mysql = require('mysql');
const inquirer = require('inquirer');
const products = require('./product.js');

// Connect to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'bamazon'
});
connection.connect(function(err) {
    if(err) throw err;
    console.log(`Connected as ID ${connection.threadId}\n`);
    displayProducts();
    start();
});

// Display products from database (id, name, price)
function displayProducts() {
    connection.query(`
    SELECT item_id, product_name, price 
    FROM products 
    WHERE ${products.stock_quantity} > 0`, (err, response) => {
        if(err) throw err;
        console.log(response);
        connection.end();
    });
}
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
    ]).then(function(err, answer) {
        const quantity = answer.quantity;
        let stock = stock_quantity;
        if(err) throw err;
        
        // Does store have enough inventory to meet customer's request?
        if(quantity > stock) {
            // NO: Prevent the order from going through
            console.log(`We apologize for the inconvenience, but only ${stock} remain`);
        // YES: Fulfill the customer's order.
        } else {
            // Update quantity in SQL database
            updateDB();
            // Once updated, display total cost of purchase
            displayTotal();
        }
    });
}

function updateDB() {
    const item = response.id;
    const updatedStock = stock - response.quantity;

    connection.query(`
    UPDATE products 
    SET stock_quantity = ${updatedStock} 
    WHERE item_id = ${item}
    `);
}

function displayTotal() {
    const customerTotal = item * quantity;

    for (i = 0; i ; i++) {
        customerTotal;
    }
    console.log(`Your total is ${customerTotal}`);
}