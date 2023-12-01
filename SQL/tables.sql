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
CREATE TABLE cart_user -- was cart
(
  id        SERIAL PRIMARY KEY,
  user_id   integer REFERENCES user_info(id) ON DELETE SET NULL
);

-- ****************** Create basket table
CREATE TABLE basket -- was cart_product
(
  id          SERIAL PRIMARY KEY,
  cart_id     integer REFERENCES cart_user(id) ON DELETE SET NULL,
  product_id  integer REFERENCES product(id),
  quantity    integer NOT NULL
);



