const mysql = require('mysql');
const inquirer = require('inquirer');
const Product = require('./product.js');
const connection = require('./database');

connection.connect(function(err) {
    if(err) console.log(err);
    console.log(`Connected as ID ${connection.threadId}\n`);
    menu();
});

// menu options
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

        if(response.menu === 'View Available Products') {
            // List available items (item IDs, names, prices, quantities)
            displayAll(function(err, products) {
                if(err) console.log(err);
                console.log(products);
                menu();
            });
                 
        } else if(response.menu === 'View Low Inventory') {
            // List all items where inventory < 5
            displayLowInventory(function(err, products) {
                if(err) console.log(err);
                console.log(products);
                menu();
            });

        } else if(response.menu === 'Add to Inventory') {
            // Display prompt to let manager "add more" of any item currently in the store
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'itemId',
                    message: 'Please enter the ID of the item you would like to restock.',
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'How many would you like to add to the inventory?'
                }
            ]).then(function(answers) {
                // Update database 
                updateStockQuantity(answers.itemId, answers.quantity, function(err) {
                    if(err) console.log(err);
                    console.log(`Inventory of item ${answers.itemId} successfully restocked (+${answers.quantity}).`);
                displayUpdatedProduct();
                menu();
                });
            });

        } else if(response.menu === 'Add New Product') {
            // Allow manager to add completely new product to store
            addProduct();
            // const newProduct = Product(name, department, price, stock);

        } else {
            console.log('You have exited the program.');
            connection.end();
        }
    });
}

function displayAll(callback) {
    connection.query(`
    SELECT item_id, product_name, price, stock_quantity 
    FROM products
    `, callback);
}

function displayLowInventory(callback) {
    connection.query(`
    SELECT item_id, product_name, stock_quantity
    FROM products
    WHERE stock_quantity < 5
    `, callback);
}

function updateStockQuantity(itemId, quantity, callback) {
    connection.query(`
    UPDATE products 
    SET stock_quantity = ${quantity} 
    WHERE item_id = ${itemId}
    `, callback);
}

function displayUpdatedProduct(itemId, callback) {
    connection.query(`
    SELECT item_id, product_name, price, inventory
    FROM products
    WHERE item_id = ${itemId}`, callback);
}

function addProduct(id, name, department, price, quantity) {
    connection.query(``);
}