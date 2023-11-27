const productRouter = require('express').Router();
const productInstance = require('../models/product.js');

// Get all products
// http://localhost:3000/product
productRouter.get('/', async (req, res) => {

  try{
      const productList = await productInstance.getAllProducts();
      res.json(productList); 
  } catch(err){
      res.status(400).send(err);
  }
})

// Get product by id
// http://localhost:3000/product/3
productRouter.get('/:id', async (req, res) => {

  let id = req.params.id;

  try {
      const product = await productInstance.getProductById(id);
      if(!product) return res.status(404).send('Invalid product number');
      res.json(product);
  } catch(err) {
      res.status(400).send(err);
  }
})

// Get products by category
// http://localhost:3000/product/categories/socks
productRouter.get('/categories/:category', async (req, res) => {
  let category = req.params.category;

  try {
      const productList = await productInstance.getProductsByCategory(category);
      if(productList.length === 0) return res.status(404).send('Invalid category');
      res.json(productList);
  } catch(err) {
      res.status(400).send(err);
  }
})

// Delete product by id
// http://localhost:3000/product/3
productRouter.delete('/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResult = await productInstance.deleteProductById(id);

    if (!deleteResult) {
      return res.status(404).send('Invalid product number');
    }

    // Access the success message and deleted product details
    const { successMessage, deletedProduct } = deleteResult;

    // Send the success message and deleted product details in the response
    res.json({ message: successMessage, deletedProduct });
  } catch (err) {
    res.status(400).send(err);
  }
});


// Add product to product table
/*
Postman - test
POST    http://localhost:3000/product/addProduct
Body: { "name": "Socks 5", "price": 7.99, "description": "Lightweight and breathable socks", "category": "socks" }
*/
productRouter.post('/addProduct', async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).send('Please provide name, price, description and category in the request body.');
    }

    await productInstance.addProduct(name, price, description, category);
    res.send('Successfully inserted into product table.');
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});


// Update product by id
/*
Postman - test
PUT     http://localhost:3000/product/updateProduct/1
Body: { "name": "Updated Socks", "price": 9.99, "description": "Updated description", "category": "updated-category" }
*/
productRouter.put('/updateProduct/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).send('Please provide name, price, description, and category in the request body.');
    }

    const updatedProduct = await productInstance.updateProductById(id, name, price, description, category);

    if (!updatedProduct) {
      return res.status(404).send('Invalid product number');
    }

    res.json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});


module.exports = productRouter