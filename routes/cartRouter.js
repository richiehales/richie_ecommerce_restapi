const cartRouter = require('express').Router();
const cartInstance = require('../models/cart.js');

// Add user to cart and product to cart_product
/*
Postman - test
POST    http://localhost:3000/cart/addUserAndProduct
Body:
{
  "userId": 2,
  "productId": 19,
  "quantity": 11
}
*/
cartRouter.post('/addUserAndProduct', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).send('Please provide userId, productId, and quantity in the request body.');
    }

    await cartInstance.addUserAndProduct(userId, productId, quantity);
    res.send('Successfully inserted into cart and cart_product.');
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});

module.exports = cartRouter;