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

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory
};



