var inquirer = require("inquirer");
var mysql = require("mysql");
// My connection to MySQL database
var connection = mysql.createConnection({
    host: "localhost",

    ports: 3306,

    user: "root",

    password: "4321Mommy",
    database: "bamazon_db"
});
//This is where I call MySQL database to send me back a list of all my items
connection.connect(function (err) {
    if (err) throw err;

    console.log("connected " + connection.threadId);

    function listItems() {

        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            //Runnning a for loop to console log my items
            for (var i = 0; i < res.length; i++) {
                console.log('-------------------------------');
                console.log("ID: " + res[i].id);
                console.log('Item: ' + res[i].product_name);
                console.log('Category: ' + res[i].department_name);
                console.log('Price: ' + res[i].price);
                console.log('Quantity: ' + res[i].quantity);
                console.log('-------------------------------')
            }
        });
    }
    //Calling my list function
    listItems();
    // setting a small time out to make sure my next function does not interfere with my first function
    setTimeout(function buyItem() {
        //inquirer funciton to ask what the customer wants to purchase
        inquirer.prompt([{
                type: "input",
                message: "Please Input The ID Number Of The Item You Would Like To Purchase",
                name: "itemId"
            },
            {
                type: "input",
                message: "How Many Would You Like?",
                name: "quantity"
            }
        ]).then(function (purchase) {
            //MySQL function to call that calls for the item the customer defines in the previous inquirer question
            var query1 = "SELECT quantity,product_name,price FROM products WHERE ?";
            var purchased = purchase.quantity;
            var quantity = connection.query(query1, {
                id: purchase.itemId
            }, function (err, res) {
                if (err) throw err;
                var itemPrice = res[0].price;
                var quantityInt = res[0].quantity;
                var productName = res[0].product_name;
                if (purchased <= quantityInt) {
                    var total = quantityInt - purchased;
                    console.log("\n");
                    console.log("Final Checkout Total: " + itemPrice * purchased + " Dollars");
                    console.log("------------------------");
                    console.log("Enjoy Your Brand New " + productName + "!")
                    console.log("------------------------");
                    //this is where we un the update query to update the quantity of the item that was just bought
                    var sql = "UPDATE products SET ? WHERE ?";
                    var query = connection.query(sql,
                        [{
                                quantity: total
                            },

                            {
                                id: purchase.itemId
                            }
                        ],
                    )
                    console.log('Thank You For Your Purchase');
                    console.log("\n");
                    connection.end();
                }
                //If there is not enough of something this if statement is ran.
                if (purchased > quantityInt) {
                    console.log("We Only Have " + quantityInt + " Left!")
                    console.log("------------------------\n");
                    connection.end();
                }
            })
        })
    }, 1000)
});