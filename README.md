# Bamazon

## Descritpion
Create an Amazon-like storefront with the MySQL skills you learned this unit. This app will take in orders from customers and deplete stock from the store's inventory. This application uses two interfaces: <b>customer</b> and <b>manager</b>

## MySQL Database Setup
In order to run this application, first you have to install the [MySQL database](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to your machine. Once MySQL is installed, you will be able to create the *Bamazon* database and the *products* table with the SQL code found in **bamazon.sql**. After this you are able to run the Bamazon customer and manager interfaces.

## Customer Interface
The *products* table should have each of the following columns:
* item_id (unique id for each product)
* product_name (Name of the product)
* department_name
* price (cost the customer will pay)
* stock_quantity (how much of the product is availble in store)

##### The customer (view) allows the user to view the current inventory of the store items: item IDs, product name, department name, price, and stock. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the desired quantity is not available, the user is prompted with an "Insufficient quantity!" alert and the order will not go through. However, if the store *does* have enough of the product the customer will be able to purchase this item.

To run the customer interface:
`cd bamazon`
`npm install`
`node bamazonCustomer.js`

## Manager Interface
The manager interface has a list of four options:
1. **View Prodcuts for sale** ( the app lists every available item: the item IDs, names, prices and quantities)
2. **View Low Inventory** (list all items with an inventory count lower than 5)
3. **Add to Inventory** (display a prompt that will let the manager "add more" of any item currently in the store)
4. **Add New Product** (allows the manager to add a completely new product to the store)


To run the manager interface:
`cd bamazon`
`npm install`
`node bamazonManager.js`

## Bamazon Demo
`screenshots, gif, or video`




