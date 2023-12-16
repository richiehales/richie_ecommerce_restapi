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

// Update basket by id
async function updateBasketById(basket_id, cart_id, product_id, quantity) {
  try {
    const text = `
      UPDATE basket
      SET cart_id = $2, product_id = $3, quantity = $4
      WHERE id = $1
      RETURNING *;
`;

  const inputs = [basket_id, cart_id, product_id, quantity];
  const result = await query(text, inputs);

    if (result.rows.length === 0) {
      // Product with the given ID was not found
      return null;
    }

    const updatedBasket = result.rows[0];
    return updatedBasket;
  } catch (err) {
    throw err.stack;
  }
}

// Delete cart item by basket
async function deleteCartItemById(data) {
  try {
    const text = 'DELETE FROM basket WHERE id = $1 RETURNING *';
    const inputs = [data];
    const result = await query(text, inputs);

    if (result.rows.length === 0) {
      // Product with the given ID was not found
      return null;
    }

    const deletedCartItem = result.rows[0];
    const successMessage = `Cart Item with id = ${data} deleted from basket table`;

    return { successMessage, deletedCartItem };
  } catch (err) {
    throw err.stack;
  }
}


module.exports = {
  getAllBaskets,
  getBasketByUserId,
  addUserAndProduct,
  updateBasketById,
  deleteCartItemById,
  updateBasketById
};