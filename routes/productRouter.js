const productRouter = require('express').Router();
const productInstance = require('../databaseQuery/productQuery');

// Get all products
productRouter.get('/', async (req, res) => {

  try{
      const productList = await productInstance.getAllProducts();
      res.json(productList); 
  } catch(err){
      res.status(400).send(err);
  }
})

// Get product by id
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

module.exports = productRouter