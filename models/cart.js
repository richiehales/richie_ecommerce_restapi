const { query } = require('../db/db');


// Get all baskets
async function getAllBaskets() {
  try{
      const result = await query('SELECT * FROM basket',[]);
      return result.rows;
  } catch(err){
      throw err.stack;
  }
}


// Get basket by user_id
async function getBasketByUserId(userId) {
  try {
    const text = `
      SELECT basket.quantity, product.*
      FROM basket
      JOIN cart_user ON basket.cart_id = cart_user.id
      JOIN product ON basket.product_id = product.id
      WHERE cart_user.user_id = $1
    `;
    const inputs = [userId];
    const result = await query(text, inputs);
    return result.rows;
  } catch (err) {
    throw err.stack;
  }
}


// Add user to cart and product to cart_product
async function addUserAndProduct(userId, productId, quantity) {
  try {
    // Insert into cart if not exists
    await query(`
      INSERT INTO cart_user (user_id)
      SELECT $1
      WHERE NOT EXISTS (SELECT 1 FROM cart_user WHERE user_id = $1)
    `, [userId]);

    // Add product to cart_product
    await query(`
      INSERT INTO basket (cart_id, product_id, quantity)
      VALUES (
        (SELECT id FROM cart_user WHERE user_id = $1),
        $2,
        $3
      )
    `, [userId, productId, quantity]);
  } catch (error) {
    throw error.stack;
  }
}

module.exports = {
  getAllBaskets,
  getBasketByUserId,
  addUserAndProduct
};