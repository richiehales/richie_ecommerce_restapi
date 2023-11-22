-- ******************* Create user table
CREATE TABLE user_info
(
  id          SERIAL PRIMARY KEY,
  password    varchar(50) NOT NULL,
  email       varchar(50) NOT NULL,
  first_name  varchar(50) NOT NULL,
  last_name   varchar(50) NOT NULL
);

-- ********************* Create product table
CREATE TABLE product
(
  id            SERIAL PRIMARY KEY,
  name          varchar(50) NOT NULL,
  price         money NOT NULL,
  description   varchar(100) NOT NULL
);

-- ******************** Create cart table
CREATE TABLE cart
(
  id        SERIAL PRIMARY KEY,
  user_id   integer REFERENCES user_info(id)
);


-- ****************** Create cart_product table
CREATE TABLE cart_product
(
  cart_id     integer REFERENCES cart(id),
  product_id  integer REFERENCES user_info(id),
  quantity    integer NOT NULL
);



-- ******************** Add data to products
INSERT INTO product (name, price, description)
VALUES 
  ('Product 1', 19.99, 'Description for Product 1'),
  ('Product 2', 29.99, 'Description for Product 2'),
  ('Product 3', 39.99, 'Description for Product 3');
