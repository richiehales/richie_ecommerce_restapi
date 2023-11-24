-- Add the user to the cart table if not already exist
INSERT INTO cart (user_id)
SELECT 3
WHERE NOT EXISTS (SELECT 1 FROM cart WHERE user_id = 3);

-- Add the product to the cart_product table
INSERT INTO cart_product (cart_id, product_id, quantity)
VALUES
  ((SELECT id FROM cart WHERE user_id = 3), 2, 1);

-- SELECT product in cart
-- Select columns to display - use product.* for all columns from product
SELECT
  product.id AS product_id,
  product.name,
  product.price,
  product.description,
  product.category,
  user_info.first_name,
  user_info.second_name,
  user_info.id AS user_id,
  cart_product.quantity
FROM
  product
JOIN
  cart_product ON product.id = cart_product.product_id
JOIN
  cart ON cart.id = cart_product.cart_id
JOIN
  user_info ON cart.user_id = user_info.id
WHERE
  cart.user_id = 1;
