var mysql = require("mysql");
var inquirer = require("inquirer");
var products;

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

// set up connection
 connection.connect(function (err) {
   if (err) throw err;
  console.log("connected as id " + connection.threadId);
  readProducts();
});

const readProducts = () => {
  connection.query("SELECT * FROM products",
    function (err, productsData) {
      if (err) throw err;
      console.log(productsData);
      products = productsData
      start();
    });
}

// connect to the mysql server and sql database
// connection.connect(function (err) {
  // if (err) throw err;
  // run the start function after the connection is made to prompt the user
  // start();
// });

// function which prompts the user for what product id they would like to buy
function start() {
  inquirer
    .prompt({
      type: "input",
      name: "product",
      message: "What is the product ID you would like to purchase? [Quit with Q]",
      validate: function(val){
        return !isNaN(val)
      }
    })
// async you need to use a .then
    .then(function(answer) {
      // based on their answer, either quit or purchase the product
      if (answer.product.toUpperCase() === "Q") {
        process.exit();
      }
      else {
        howMany(answer.product);
      }
    });
  }

      // function ask how many units of the product they would like to purchase
      function howMany(product) {
        // prompt for how many products they would like to buy
        inquirer
          .prompt([
            {
              name: "quantity",
              type: "input",
              message: "How many would you like to purchase?",
              //checking if it is not not a number
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
          .then(function(answer) {
            // console.log(productsData)
            console.log(products[product-1], answer.quantity)
            if (products[product-1].quantity >= answer.quantity) {
              updateSQL(product, answer.quantity);
            } else {
              console.log("Insufficient quantity!")
            };
           
          });
        }

        function updateSQL(product, quantity) {
        // check if there is enough stock for the product being purchased
        
          // after the customer makes a purchase update the quantity for the products
          connection.query("UPDATE Products SET ? WHERE ?", [
            {quantity: (products[product-1].quantity - quantity)},
            {id: product}
          ]), function(err, res) {
            if(err) throw err;
            var total = products[product-1].price * quantity
            // .tofixed converts number into a string, keeping only 2 decimal points
            console.log("Success! Your total is $" + total.toFixed(2))
          } 
      
        reprompt();
      };

        // after reprompt ask if they would like to purchase another item
        function reprompt(){
          inquirer.prompt([{
            type: "confirm",
            name: "reply",
            message: "Would you like to purchase another item?"
          }]).then(function(answer) {
            if(answer.reply){
              start();
            }
            else {
              console.log("Thank you!");
              // this quits out of node.js
              process.exit();
            }
          })
        }

        // start
        start();

