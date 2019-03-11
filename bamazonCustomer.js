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
        console.log(response);
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
        console.log(`answers.id: ${answers.id}`);
        console.log(`answers.quantity: ${answers.quantity}`);

        getProduct(answers.id, function(err, products) {
            if(err) console.log(err);
            console.log(products);
            // Does store have enough inventory to meet customer's request?
            const stock = products[0].stock_quantity;
            const price = products[0].price;
            if(stock < answers.quantity) {
                // NO: Prevent the order from going through
                console.log(`Sorry, only ${stock} remain`);
                connection.end();
            // YES: Fulfill the customer's order.
            } else {
                // Update quantity in SQL database
                const newStock = stock - answers.quantity;
                updateStockQuantity(answers.id, newStock, function(err) {
                    if(err) console.log(err);
                    // Once updated, display total cost of purchase
                    console.log(`The total for ${answers.quantity} ${products[0].product_name} is $${price * answers.quantity}`);
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