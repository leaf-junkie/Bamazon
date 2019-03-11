const cTable = require('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const Product = require('./product.js');
const connection = require('./database');

connection.connect(function(err) {
    if(err) console.log(chalk.bgRed(err));
    console.log(chalk.gray(`Connected as ID ${connection.threadId}\n`));
    menu();
});

// menu options
function menu() {
    console.log('......................................................................')
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
                if(err) console.log(chalk.bgRed(err));
                products.forEach(p => p.price = `$ ${p.price.toFixed(2)}`);
                console.table(products);
                menu();
            });
                 
        } else if(response.menu === 'View Low Inventory') {
            // List all items where inventory < 5
            displayLowInventory(function(err, products) {
                if(err) console.log(chalk.bgRed(err));
                
                if(products.length === 0) {
                    console.log('There are currently no items with low inventory.')
                } else {
                    console.table(products);
                }
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
                // Check if itemId exists in the database
                // if(answers.itemId < 0 || answers.itemId > products.length) {
                //     console.log('Please enter a valid ID.');
                //     menu();
                // } else {
                    // Update database 
                    updateStockQuantity(answers.itemId, answers.quantity, function(err) {
                        if(err) console.log(chalk.bgRed(err));
                        console.log(`Item ${answers.itemId} successfully restocked (${answers.quantity} added).`);
                        displayUpdatedProduct(answers.itemId, function() {
                            menu();
                        });
                    });
                // }
            });

        } else if(response.menu === 'Add New Product') {
            // Allow manager to add completely new product to store
            console.log('Please follow the prompt to add information about the new item.');
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newName',
                    message: 'What is the name of the item you would like to add?'
                },
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: 'What is the name of the department?'
                },
                {
                    type: 'input',
                    name: 'newPrice',
                    message: 'What is the price per item?'
                },
                {
                    type: 'input',
                    name: 'newQuantity',
                    message: 'How many would you like to add?'
                }
            ]).then(function(answers) {
                addProduct(answers.newName, answers.newDepartment, answers.newPrice, answers.newQuantity, function(err, response) {
                    if(err) console.log(chalk.bgRed(err));
                    displayAll(function(err, products) {
                        if(err) console.log(chalk.bgRed(err));
                        products.forEach(p => p.price = `$ ${p.price.toFixed(2)}`);
                        console.table(products);
                        console.log('\nItem successfully added!');
                        menu();
                    });
                });
            });

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
    SET stock_quantity = stock_quantity + ${quantity} 
    WHERE item_id = ${itemId}
    `, callback);
}

function displayUpdatedProduct(itemId, callback) {
    connection.query(`
    SELECT item_id, product_name, price, inventory
    FROM products
    WHERE item_id = ${itemId}`, callback);
}

function addProduct(name, department, price, quantity, callback) {
    connection.query(`
    INSERT INTO products(product_name, department_name, price, stock_quantity)
    VALUES('${name}', '${department}', ${price}, ${quantity})`, callback);
}

function formatTable(products) {
    console.table([
        {
            id: products.item_id,
            name: products.product_name,
            department: products.department_name,
            price: products.price,
            stock: products.stock_quantity
        }
    ]);    
}