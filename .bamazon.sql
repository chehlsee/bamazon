-- create a MySQL database called bamazon
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	department VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INT NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, quantity)
VALUES 
("Apple", "Produce", 1.99, 100),
("Orange", "Produce", 2.50, 100),
("Dragonfruit", "Produce", 2.50, 100),
("Mango", "Produce", 3.10, 120),
("Pear", "Produce", 3.10, 120),
("Kiwi", "Produce", 1.99, 100),
("Pineapple", "Produce", 2.50, 100),
("Strawberries", "Produce", 3.10, 120),
("Grapes", "Produce",3.25, 75),
("Grapes", "Produce",3.25, 75);
