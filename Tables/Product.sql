-- CREATE DATABASE ASSK;
-- USE ASSK;
-- CREATE TABLE products (
--     product_id INT AUTO_INCREMENT,
--     product_name VARCHAR(30),
--     price INT,
--     description VARCHAR(200),
--     stock INT,
--     CONSTRAINT p_pk PRIMARY KEY (product_id)
-- );

-- CREATE TABLE product_hotel (
--     hotel_id   INT ,
--     product_id INT ,    
--     CONSTRAINT ph_pk PRIMARY KEY(hotel_id),
--     CONSTRAINT ph_fk FOREIGN KEY(product_id)
-- );

-- INSERT INTO products (product_name,price,description,stock)
-- VALUES
-- ('Idly',25,'Soft n delicious',10),
-- ('Onion Dosa',40,'crispy paper like butterly pancake',15),
-- ('Sphagetti Noodles',130,'Traditional Thai Noodles',10	),
-- ('Chicken Biryani',150,'The exotic chicken roasted ramzan biryani',8);

-- SELECT * FROM products;