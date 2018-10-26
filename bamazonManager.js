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
function start() {
  inquirer.prompt([{
    type: "list",
    name: "doSomething",
    message: "What would you like to do?",
    choices: ["View Products for sale", "View Low Inventory", "Add to Inventory", "Add to Inventory", "Add a New Product"]
  }]).then(function (answer) {
    switch (answer.doSomething) {
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
function viewAllProducts() {
  console.log("Viewing All Products");

  connection.query("SELECT * FROM Products", function (err, res) {
    if (err) throw err;
    console.log(" ")

    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Deparment: " + res[i].department_name
      + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity)
    }

    // start function
    start();
  });
}


//  when selecting LOW INVENTORY it should list all items with an inventory count lower than 5
function viewLowInventory() {
  console.log("Viewing Low Inventory");

  connection.query("SELECT * FROM Products", function (err, res) {
    if (err) throw err;
    console.log(" ")

    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity <= 5) {
        console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Deparment: " + res[i].department_name)
      }
    }

    // start function
    start();
  });
}

// when selecting ADD TO INVENTORY your app should display a prompt that will let the manager add more of any item currently in the store
// displays prompt to add more of an item to the store and asks how much
function addToInventory() {
  console.log("Adding to inventory");

  connection.query("SELECT * FROM Products", function (err, res) {
    if (err) throw err;
    var productArray = [];
    // this will push each item into the productArray
    for (var i = 0; i < res.length; i++) {
      productArray.push(res[i].product_name);
    }
  });
}

inquirer.prompt([{
  type: "list",
  name: "product",
  choices: productArray,
  message: "What items would you like to add to inventory?"
}]), {
  type: "input",
  name: "qty",
  message: "How many would you like to add?",
  validate: function (value) {
    if (isNaN(value) === false) { return true; }
    else { return false; }
  }
}.then(function (answer) {
  var currentQty;
  for (var i = 0; i < res.length; i++) {
    if (res[i].product_name === answer.item_id) {
      currentQty = res[i].stock_quantity;
    }
  }
  connection.query("UPDATE Products SET ? WHERE ?"), [
    { stock_quantity: currentQty + parseInt(answer.qty) },
    { product_name: answer.item_id }
  ], function (err, res) {
    if (err) throw err;
    console.log("The quantity has been updated");
    start();
  }
});

// when selecting ADD NEW PRODUCT it should allow the manager to add a completely new product to the store

//allows manager to add a completely new product to the store
function addNewProduct(){
  console.log("Adding a new product");
  var deptNames = [];

  //grab name of the department the product is from
  connection.query('SELECT * FROM Departments', function(err, res){
    if(err) throw err;
    for(var i = 0; i<res.length; i++){
      deptNames.push(res[i].department_name);
    }
  })

  inquirer.prompt([{
    type: "input",
    name: "product",
    message: "Product: ",
    validate: function(value){
      if(value){return true;}
      else{return false;}
    }
  }, {
    type: "list",
    name: "department",
    message: "Department: ",
    choices: deptNames
  }, {
    type: "input",
    name: "price",
    message: "Price: ",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
  }, {
    type: "input",
    name: "quantity",
    message: "Quantity: ",
    validate: function(value){
      if(isNaN(value) == false){return true;}
      else{return false;}
    }
  }]).then(function(ans){
    connection.query('INSERT INTO Products SET ?',{
      product_name: answer.product,
      department_name: answer.department,
      price: answer.price,
      stock_quantity: answer.quantity
    }, function(err, res){
      if(err) throw err;
      console.log("You added a new product to the store!");
    })
    start();
  });
}

start();