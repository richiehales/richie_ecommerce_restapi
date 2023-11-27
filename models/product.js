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


// Get products by category
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


// Add product to product table
async function addProduct(name, price, description, category) {
  try {
    const text = `
      INSERT INTO product (name, price, description, category)
      VALUES ($1, $2, $3, $4)
    `;
    const inputs = [name, price, description, category];
    await query(text, inputs);
  } catch (error) {
    throw error.stack;
  }
}


// Update product by id
async function updateProductById(id, name, price, description, category) {
  try {
    const text = `
      UPDATE product
      SET name = $2, price = $3, description = $4, category = $5
      WHERE id = $1
      RETURNING *;
    `;

    const inputs = [id, name, price, description, category];
    const result = await query(text, inputs);

    if (result.rows.length === 0) {
      // Product with the given ID was not found
      return null;
    }

    const updatedProduct = result.rows[0];
    return updatedProduct;
  } catch (err) {
    throw err.stack;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  deleteProductById,
  addProduct,
  updateProductById
};



