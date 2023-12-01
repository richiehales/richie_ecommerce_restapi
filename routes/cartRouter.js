const cartRouter = require('express').Router();
const cartInstance = require('../models/cart.js');

// Add user to cart_user and product/quatity to basket
/*
Postman - test
POST    http://localhost:3000/cart/addUserAndProduct
Body:
{
  "userId": 15,
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
    res.status(500).send(error);
  }
});

module.exports = cartRouter;