var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    ports: 3306,

    user:"root",

    password: "4321Mommy",
    database: "bamazon_db"
});

function searchArtist() {
    inquirer.prompt([{
        type: "input",
        message: "who are you looking for?",
        name: "artist"
    }]).then(function (itemid) {

        var artist = itemid.artist;
        var sql = "SELECT * FROM products WHERE id = ?";
        connection.query(sql, [artist], function (err, res) {
            if (err) throw err;
            console.log("connected as id " + connection.threadId);
            for (var i = 0; i < res.length; i++) {
                console.log('-------------------------------');
                        console.log("ID: " + res[i].id);
                        console.log('Item: ' + res[i].product_name);
                        console.log('Category: ' + res[i].department_name);
                        console.log('Price: ' + res[i].price);
                        console.log('Quantity: ' + res[i].quantity);
                        console.log('-------------------------------')
            }
            connection.end();
        })
    })
}

function listItems(){

connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    for (var i = 0; i < res.length; i++) {
        console.log('-------------------------------');
        console.log("ID: " + res[i].id);
        console.log('Item: ' + res[i].product_name);
        console.log('Category: ' + res[i].department_name);
        console.log('Starting Bid: ' + res[i].price);
        console.log('Current Bid: ' + res[i].quantity);
        console.log('-------------------------------')
    }
});

}


