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
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
          return true;
        } else {
          return false;
        }
      }
    })
// async you need to use a .then
    .then(function(answer) {
      // based on their answer, either quit or purchase the product
      if (answer.product.toUpperCase() === "Q") {
        process.exit();
      }
      else {
        purchaseProduct();
      }
    });
  }

      // function ask how many units of the product they would like to purchase
      function howMany() {
        // prompt for how many products they would like to buy
        inquirer
          .prompt([
            {
              name: "product",
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
            // when finished prompting, insert a new item into the db with the update quantity info
            connection.query(
              "INSERT INTO updatedProducts SET ?",
              {
                item_id: answer.id,
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
              },
              function(err) {
                if (err) throw err;
                console.log("Your items were purchased successfully!")
                // re-prompt the user for if they want to purchase another item
                reprompt();
              }
            );
          });
        }

        // check if there is enough stock for the product being purchased
        if (res[howMany].stock_quantity >= item_id) {
          // after the customer makes a purchase update the quantity for the products
          connection.query("UPDATE Products SET ? WHERE ?", [
            {stock_quantity: (res[item_id].stock_quantity - howMany)},
            {item_id: answer.id}
          ]), function(err, result) {
            if(err) throw err;
            // .tofixed converts number into a string, keeping only 2 decimal points
            console.log("Success! Your total is $" + total.toFixed(2))
          } 
        } else {
          console.log("Insufficient quantity!")
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
            }
          })
        }

        // start
        start();

