var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    ports: 3306,

    user: "root",

    password: "4321Mommy",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log("connected " + connection.threadId);

    function listItems() {

        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
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

    listItems();

    setTimeout(function buyItem() {
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
            var query1 = "SELECT quantity, product_name FROM products WHERE ?";
            var purchased = purchase.quantity;
            var quantity = connection.query(query1, {
                id: purchase.itemId
            }, function (err, res) {
                if (err) throw err;
                var quantityInt = res[0].quantity;
                var productName = res[0].product_name;
                if (purchased <= quantityInt) {
                    var total = quantityInt - purchased;
                    // console.log(quantityInt);
                    // console.log(purchased);
                    // console.log(total);
                    console.log("Enjoy Your Brand New " + productName + "!")
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
                    console.log('Thank You For Your Purchase!');
                    connection.end();
                }
                if (purchased > quantityInt) {
                    console.log("We Only Have " + quantityInt + " Left!")
                    connection.end();
                }
            })
        })
    }, 1000)
});