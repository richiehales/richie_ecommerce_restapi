const orderRouter = require('express').Router();
const orderInstance = require('../models/order.js');


// Get all orders
// http://localhost:3000/order
orderRouter.get('/', async (req, res) => {
  
  try{
      const orderList = await orderInstance.getAllOrders();
      res.json(orderList); 
  } catch(err){
      res.status(400).send(err);
  }
})


// Get basket by user_id
// http://localhost:3000/order/1
orderRouter.get('/:id', async (req, res) => {

  let id = req.params.id;

  try {
      const order = await orderInstance.getOrderByUserId(id);
      if(!order) return res.status(404).send('Invalid order number');
      res.json(order);
  } catch(err) {
      res.status(400).send(err);
  }
})


/// Copy basket item to order_user and orders when basket id
// http://localhost:3000/order/copyBasketToOrders
// Body: {"basketId": 1}
orderRouter.post('/copyBasketToOrders', async (req, res) => {
  
  try {
    const { basketId } = req.body;

    if (!basketId) {
      return res.status(400).send('Please provide basketId in the request body.');
    }

    const result = await orderInstance.copyBasketToOrders(basketId);

    if (!result) {
      return res.status(404).send('Basket with the given ID not found.');
    }

    res.send(result);
  } catch (error) {
    res.status(500).send(error.stack);
  }
});


module.exports = orderRouter;


