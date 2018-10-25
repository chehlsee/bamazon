var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// List new menu options
//  view products for sale
function start(){
  inquirer.prompt([{
    type: "list",
    name: "doSomething",
    message: "What would you like to do?",
    choices: ["View Products for sale", "View Low Inventory", "Add to Inventory", "Add to Inventory", "Add a New Product"]
  }]).then(function(answer){
    switch(answer.doSomething){
      case "View Products for Sale": viewProducts();
      break;

      case "View Low Inventory": viewLowInventory();
      break;

      case "Add to Inventory": addToInventory();
      break;

      case "Add New Product": addNewProduct();
      break;

      case "Leave Store": console.log("Thanks for visiting our store!");
    }
  });
}

// view all of the inventory
function viewAllProducts(){
  console.log("Viewing All Products");

  connection.query("SELECT * FROM Products", function(err, res){
    if(err) throw err;
    console.log(" ")

    for (var i = 0; i<res.length; i++){
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Deparment: " + res[i].department_name)
    }

    // start function
    start();
  });
}


// view low inventory

// add to inventory

// add new product

// when selecting VIEW PRODUCTS for sale, the app should list every available item: item ids, names, prices, and wuantities

//  when selecting LOW INVENTORY it should list all items with an inventory count lower than 5
function viewLowInventory(){
  console.log("Viewing Low Inventory");

  connection.query("SELECT * FROM Products", function(err, res){
    if (err) throw err;
    console.log(" ")

    for(var i =0; i<res.length;i++){
      if(res[i].stock_quantity <= 5) {
        console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Deparment: " + res[i].department_name)
      }
    }

    // start function
    start();
  });
}

// when selecting ADD TO INVENTORY your app should display a prompt that will let the manager add more of any item currently in the store

// when selecting ADD NEW PRODUCT it should allow the manager to add a completely new product to the store

