const { query } = require('../db/db');

// Get all products
async function getAllProducts() {
  try{
      const result = await query('SELECT * FROM product',[]);
      return result.rows;
  } catch(err){
      throw err.stack;
  }
}

// Get product by id
async function getProductById(data) {
  try{
      const text = 'SELECT * FROM product WHERE id = $1';
      const inputs = [data];
      const result = await query(text, inputs);
      return result.rows[0];
  } catch(err) {
      throw err.stack;
  }
}

async function getProductsByCategory(data) {
  try{
      const text = 'SELECT * FROM product WHERE category = $1;';
      const inputs = [data];
      const result = await query(text, inputs);
      return result.rows;
  } catch(err) {
      throw err.stack;
  }
}

// Delete product by id
async function deleteProductById(data) {
  try {
    const text = 'DELETE FROM product WHERE id = $1 RETURNING *';
    const inputs = [data];
    const result = await query(text, inputs);

    if (result.rows.length === 0) {
      // Product with the given ID was not found
      return null;
    }

    const deletedProduct = result.rows[0];
    const successMessage = `Product with id = ${data} deleted from product table`;

    return { successMessage, deletedProduct };
  } catch (err) {
    throw err.stack;
  }
}

async function addProduct(name, price, description, category) {
  try {
   
    // Add product to cart_product
    await query(`
      INSERT INTO product (name, price, description, category)
      VALUES (
        $1,
        $2,
        $3,
        $4
      )
    `, [name, price, description, category]);
  } catch (error) {
    throw error.stack;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  deleteProductById,
  addProduct
};



