const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./database');

connection.connect(function(err) {
    if(err) console.log("Error: " + err);
    console.log(`Connected as ID ${connection.threadId}\n`);
    displayProducts();
});

// Display products from database (id, name, price)
function displayProducts() {
    connection.query(`
    SELECT item_id, product_name, price 
    FROM products 
    WHERE stock_quantity > 0`, (err, response) => {
        if(err) console.log(err);
        response.forEach(p => p.price = `$ ${p.price.toFixed(2)}`);
        console.table(response);
        // connection.end();
        start();
    });
}

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
    ]).then(function(answers) {
        getProduct(answers.id, function(err, products) {
            if(err) console.log(err);
            products.forEach(p => p.price = `$ ${p.price.toFixed(2)}`);
            console.table(products);
            
            const stock = products[0].stock_quantity;
            const price = products[0].price;
            
            // If insufficient inventory, prevent order from processing
            if(stock < answers.quantity) {
                console.log(`Sorry, only ${stock} remain`);
                connection.end();

            // If sufficient inventory, fulfill order
            } else {
                // Update quantity in SQL database
                const newStock = stock - answers.quantity;
                updateStockQuantity(answers.id, newStock, function(err) {
                    if(err) console.log(err);
                    // Once updated, display total cost of purchase 
                    console.log(`The total for ${answers.quantity} ${products[0].product_name} is $${parseInt(products[0].price.substring(1)) * answers.quantity}`);
                    connection.end();

                    // Confirm purchase
                    inquirer
                    .prompt([
                        {
                            type: 'confirm',
                            name: 'confirm',
                            message: 'Are you sure?',
                        }
                    ]).then(function(answer) {
                        if (answer.confirm === true) {
                            console.log(`Bamazon Primo will deliver your ${products[0].product_name} in two business days!`);
                        } else {
                            console.log(`We're sorry you changed your mind.`);
                        }
                    })
                });
            }
        });
    });
}

function updateStockQuantity(itemId, quantity, callback) {
    connection.query(`
    UPDATE products 
    SET stock_quantity = ${quantity} 
    WHERE item_id = ${itemId}
    `, callback);
}

function getStockQuantity(itemId, callback) {
    connection.query(`
    SELECT stock_quantity
    FROM products
    WHERE item_id = ${itemId}
    `, callback);
}

function getProduct(itemId, callback) {
    connection.query(`
    SELECT *
    FROM products
    WHERE item_id = ${itemId}
    `, callback);
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