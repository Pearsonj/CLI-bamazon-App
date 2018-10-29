var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    ports: 3306,

    user: "root",

    password: "4321Mommy",
    database: "bamazon_db"
});



// function chooseCat() {
//     inquirer.prompt([{
//         type: "list",
//         choices: ["Tech", "Random", "Automotive", "Kitchen", "Furniture"],
//         message: "What Are You Interested In?",
//         name: "cat"
//     }]).then(function (catSelect) {
//         if (catSelect.cat === "Tech") {
//             function listItems() {

//                 connection.query("SELECT * FROM products WHERE department_name = 'Tech'", function (err, res) {
//                     if (err) throw err;
//                    ;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log('-------------------------------');
//                         console.log("ID: " + res[i].id);
//                         console.log('Item: ' + res[i].product_name);
//                         console.log('Category: ' + res[i].department_name);
//                         console.log('Price: ' + res[i].price);
//                         console.log('Quantity: ' + res[i].quantity);
//                         console.log('-------------------------------')
//                     }
//                     
//                 });
//             }
//             listItems();
//         }


//         if (catSelect.cat === "Random") {
//             function listItems() {

//                 connection.query("SELECT * FROM products WHERE department_name = 'Random'", function (err, res) {
//                     if (err) throw err;
//                    ;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log('-------------------------------');
//                         console.log("ID: " + res[i].id);
//                         console.log('Item: ' + res[i].product_name);
//                         console.log('Category: ' + res[i].department_name);
//                         console.log('Price: ' + res[i].price);
//                         console.log('Quantity: ' + res[i].quantity);
//                         console.log('-------------------------------')
//                     }
//                     connection.end();
//                 });
//             }
//             listItems();
//         }

//         if (catSelect.cat === "Automotive") {
//             function listItems() {

//                 connection.query("SELECT * FROM products WHERE department_name = 'Automotive'", function (err, res) {
//                     if (err) throw err;
//                    ;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log('-------------------------------');
//                         console.log("ID: " + res[i].id);
//                         console.log('Item: ' + res[i].product_name);
//                         console.log('Category: ' + res[i].department_name);
//                         console.log('Price: ' + res[i].price);
//                         console.log('Quantity: ' + res[i].quantity);
//                         console.log('-------------------------------')
//                     }
//                     connection.end();
//                 });
//             }
//             listItems();
//         }

//         if (catSelect.cat === "Kitchen") {
//             function listItems() {

//                 connection.query("SELECT * FROM products WHERE department_name = 'Kitchen'", function (err, res) {
//                     if (err) throw err;
//                    ;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log('-------------------------------');
//                         console.log("ID: " + res[i].id);
//                         console.log('Item: ' + res[i].product_name);
//                         console.log('Category: ' + res[i].department_name);
//                         console.log('Price: ' + res[i].price);
//                         console.log('Quantity: ' + res[i].quantity);
//                         console.log('-------------------------------')
//                     }
//                     connection.end();
//                 });
//             }
//             listItems();
//         }

//         if (catSelect.cat === "Furniture") {
//             function listItems() {

//                 connection.query("SELECT * FROM products WHERE department_name = 'Furniture'", function (err, res) {
//                     if (err) throw err;
//                    ;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log('-------------------------------');
//                         console.log("ID: " + res[i].id);
//                         console.log('Item: ' + res[i].product_name);
//                         console.log('Category: ' + res[i].department_name);
//                         console.log('Price: ' + res[i].price);
//                         console.log('Current Quantity: ' + res[i].quantity);
//                         console.log('-------------------------------')
//                     }
//                     connection.end();
//                 });
//             }

//             listItems();
//             setTimeout(buyItem(), 10000);

//         } 
//     });
// }
// chooseCat();

// function buyItem() {

//     inquirer.prompt([{
//             type: "input",
//             message: "Please Input The ID Number Of The Item You Would Like To Purchase",
//             name: "itemId"
//         },
//         {
//             type: "input",
//             message: "How Many Would You Like?",
//             name: "quantity"
//         }
//     ]).then(function (purchase) {
//         var sql = "UPDATE products SET ? WHERE ?",
//             query = connection.query(
//                 sql,
//                 [{
//                         quantity: quantity - purchase.quantity
//                     },
//                     {

//                         id: purchase.itemId
//                     }
//                 ],
//                 console.log(query.sql)
//             )

//     })
// }


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
            var query1 = "SELECT quantity FROM products WHERE ?";
            var purchased = purchase.quantity;
            var quantity = connection.query(query1, {id:purchase.itemId},function (err, res) {
                if(err) throw err;
                var quantityInt = res[0].quantity;
                if(purchased <= quantityInt){
                var total = quantityInt - purchased;
                console.log(quantityInt);
                console.log(purchased);
                console.log(total);
                
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

            console.log('updated');
            connection.end();
            
                }
                if(purchased > quantityInt){
                    console.log("We Only Have " + quantityInt + " Left!")
                    connection.end();
                }

               
            })   
        })

    }, 1000)
});