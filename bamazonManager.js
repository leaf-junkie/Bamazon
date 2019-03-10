const mysql = require('mysql');
const inquirer = require('inquirer');
const Product = require('./product.js');
const connection = require('./database');

// List a set of menu options:
//      View Products for Sale
//      View Low Inventory
//      Add to Inventory
//      Add New Product
function menu() {
    
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Welcome! Please select from the following options: ',
            choices: ['View Available Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }
    ]).then(function(response) {

        if(response === 'View Available Products') {
            // List available items (item IDs, names, prices, quantities)
            connection.connect(function(err) {
                if(err) console.log(err);
                console.log(`Connected as ID ${connection.threadId}\n`);
                displayAll();
            });

            function displayAll() {
                connection.query('SELECT * FROM products'), function(err, products) {
                    if(err) console.log(err);
                    console.log(products);
                    connection.end();
                }
            }

        } else if(response === 'View Low Inventory') {
            // List all items where inventory < 5

        } else if(response === 'Add to Inventory') {
            // Display prompt to let manager "add more" of any item currently in the store
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'selectItem',
                    message: 'Please select the item you would like to restock.',
                    choices: ['', '', '', '', '', '', '', '', '', '']
                }
            ]).then(function(selectedItem) {

            });

        } else if(response === 'Add New Product') {
            // Allow manager to add completely new product to store
            const newProduct = Product(name, department, price, stock);

        } else {
            console.log('You have exited the program.');
        }
    });
}
menu();