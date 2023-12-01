const cartRouter = require('express').Router();
const cartInstance = require('../models/cart.js');


// Get all baskets
// http://localhost:3000/cart
cartRouter.get('/', async (req, res) => {

  try{
      const basketList = await cartInstance.getAllBaskets();
      res.json(basketList); 
  } catch(err){
      res.status(400).send(err);
  }
})


// Get basket by user_id
// http://localhost:3000/cart/1
cartRouter.get('/:id', async (req, res) => {

  let id = req.params.id;

  try {
      const basket = await cartInstance.getBasketByUserId(id);
      if(!basket) return res.status(404).send('Invalid product number');
      res.json(basket);
  } catch(err) {
      res.status(400).send(err);
  }
})


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


// Update basket by id
/*
Postman - test
PUT     http://localhost:3000/cart/updateBasket/1
Body: {"cart_id":1,"product_id":1,"quantity":100}   
******* Depending on cart structure.info - Must update all id's correctly or can swap to another user basket through cart_id ******
*/
cartRouter.put('/updateBasket/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const { cart_id, product_id, quantity } = req.body;

    if (!cart_id || !product_id || !quantity) {
      return res.status(400).send('Please provide name, price, description, and category in the request body.');
    }

    const updatedCart = await cartInstance.updateBasketById(id, cart_id, product_id, quantity);

    if (!updatedCart) {
      return res.status(404).send('Invalid product number');
    }

    res.json({ message: 'Basket updated successfully', updatedCart });
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});

module.exports = cartRouter;