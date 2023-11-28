-- ******************* Create user table
CREATE TABLE user_info
(
  id          SERIAL PRIMARY KEY,
  password    varchar(100) NOT NULL,
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
  description   varchar(100) NOT NULL,
  category      varchar(50) NOT NULL
);

-- ******************** Create cart table
CREATE TABLE cart
(
  id        SERIAL PRIMARY KEY,
  user_id   integer REFERENCES user_info(id) ON DELETE SET NULL
);

-- ****************** Create cart_product table
CREATE TABLE cart_product
(
  cart_id     integer REFERENCES cart(id) ON DELETE SET NULL,
  product_id  integer REFERENCES product(id),
  quantity    integer NOT NULL
);



