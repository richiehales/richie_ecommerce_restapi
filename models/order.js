const { query } = require('../db/db');


// Get all orders
async function getAllOrders() {
  try{
      const result = await query('SELECT * FROM basket',[]);
      return result.rows;
  } catch(err){
      throw err.stack;
  }
}


// Get order by user_id
async function getOrderByUserId(userId) {
  try {
    const text = `
      SELECT orders.quantity, product.*
      FROM orders
      JOIN order_user ON orders.order_id = order_user.id
      JOIN product ON orders.product_id = product.id
      WHERE order_user.user_id = $1
      `;
    const inputs = [userId];
    const result = await query(text, inputs);
    return result.rows;
  } catch (err) {
    throw err.stack;
  }
}


// Add user to order_user and product/quantity to orders with basket Id
async function copyBasketToOrders(basketId) {
  try {
    // Get information from the basket
    const basketInfo = await query('SELECT * FROM basket WHERE id = $1', [basketId]);
        if (basketInfo.rows.length === 0) {
      return null; // Basket with the given ID not found
    }

    const { cart_id, product_id, quantity } = basketInfo.rows[0];

    // Assuming cart_user has a user_id column, adjust as needed
    const cartUserInfo = await query('SELECT user_id FROM cart_user WHERE id = $1', [cart_id]);
  
    
    if (cartUserInfo.rows.length === 0) {
      return 'User information not found for the associated cart.';
    }

    const userId = cartUserInfo.rows[0].user_id;
    // Insert into order_user if not exists
    await query(`
      INSERT INTO order_user (user_id)
      SELECT $1
      WHERE NOT EXISTS (SELECT 1 FROM order_user WHERE user_id = $1);
    `, [userId]);

    // Add product to orders
    await query(`
      INSERT INTO orders (order_id, product_id, quantity)
      VALUES (
        (SELECT id FROM order_user WHERE user_id = $1),
        $2,
        $3
      )
    `, [userId, product_id, quantity]);

    // Delete the entry from the basket table
    await query('DELETE FROM basket WHERE id = $1', [basketId]);

    return 'Successfully copied from basket to order_user and orders.';
  } catch (error) {
    throw error.stack;
  }
}


// Add user to order_user and product/quantity to orders by user_id
async function copyBasketToOrdersUserId(userId) {
  try {
    // Insert into order_user
    await query(`
      INSERT INTO order_user (user_id)
      SELECT DISTINCT cu.user_id
      FROM cart_user cu
      JOIN basket b ON cu.id = b.cart_id
      WHERE cu.user_id = $1;
    `, [userId]);

    // Insert into orders
    await query(`
      INSERT INTO orders (order_id, product_id, quantity)
      SELECT ou.id AS order_id, b.product_id, b.quantity
      FROM order_user ou
      JOIN cart_user cu ON ou.user_id = cu.user_id
      JOIN basket b ON cu.id = b.cart_id
      WHERE cu.user_id = $1;
    `, [userId]);

    // Delete entries from the basket table
    await query('DELETE FROM basket WHERE cart_id IN (SELECT id FROM cart_user WHERE user_id = $1)', [userId]);

    return 'Successfully copied from basket to order_user and orders.';
  } catch (error) {
    throw error.stack;
  }
}

module.exports = {
  getAllOrders,
  getOrderByUserId,
  copyBasketToOrders,
  copyBasketToOrdersUserId
};