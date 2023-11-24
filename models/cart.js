const { query } = require('../db/db');

// Add user to cart and product to cart_product
async function addUserAndProduct(userId, productId, quantity) {
  try {
    // Insert into cart if not exists
    await query(`
      INSERT INTO cart (user_id)
      SELECT $1
      WHERE NOT EXISTS (SELECT 1 FROM cart WHERE user_id = $1)
    `, [userId]);

    // Add product to cart_product
    await query(`
      INSERT INTO cart_product (cart_id, product_id, quantity)
      VALUES (
        (SELECT id FROM cart WHERE user_id = $1),
        $2,
        $3
      )
    `, [userId, productId, quantity]);
  } catch (error) {
    throw error.stack;
  }
}

module.exports = {
  addUserAndProduct,
};