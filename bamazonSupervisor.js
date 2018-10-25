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




// create a new MySQL table called DEPARTMENTS
//  department_id department_name over_head_costs

// modify the products table so that there's a product_sales column and modify your bamazonCustomer.js app so that when a customer purchases anything from the store the price of the product multiplied by the quantity purchased is added to the product's peoduct_sales column

// app should update the inventory in the products column

// in bamazonSupervisor.js will list a set of menu options
// view product sales by department
// create new department

// when a supervisor selects VIEW PRODUCT SALES BY DEPARTMENT the app should display a summarized table in their terminal window

// total_profit column should be calculated on the fly using the DIFFERENCE BETWEEN over_head_costs and product_sales
// total_profit should not be stored in any database

// *look into aliases in MySQL, groups bys, joins, npm package that can log the table to the console