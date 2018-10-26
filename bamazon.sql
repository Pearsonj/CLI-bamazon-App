--first we are going to drop the DB if it already exists
DROP DATABASE IF EXISTS bamazon_db;
--then we are going to create the new DB
CREATE DATABASE bamazon_db;
--making sure that we are using the new DB
USE bamazon_db;
--creating the new table
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY id
);

--add content to our table
INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Bumper Sticker', 'Automotive', 10, 3);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Arm Chair', 'Furniture', 350, 15);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Seat Covers', 'Automotive', 25, 12);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Mixer', 'Kitchen', 225, 20);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Plate Set', 'Kitchen', 100, 19);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('10" Flat Screen', 'Tech', 1200, 1);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Ugly Rug', 'Furniture', 4000, 2);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('New Car', 'Automotive', 1200, 5);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('A Brick', 'Random', 50000, 800);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Teddy Bear', 'Random', 44, 90);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Monitor', 'Tech', 49, 4);





