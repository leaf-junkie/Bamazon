const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '12345678',
    database: 'bamazon'
});

connection.connect(function(err){
    if(err) throw err;
    start();
});

// Display products (id, name, price)
function displayProducts() {

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
        // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        //      If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    
        // However, if your store does have enough of the product, you should fulfill the customer's order.
        //      This means updating the SQL database to reflect the remaining quantity.
        //      Once the update goes through, show the customer the total cost of their purchase.
    
    });
    
}