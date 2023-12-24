const checkoutRouter = require('express').Router();
const checkoutInstance = require('../models/checkout.js');

// Route to process payment and checkout by basket id
/*
Postman - test
POST    http://localhost:3000/checkout
Body:
{
  "paymentDetails": {
    "cardNumber": "1234123412341234",
    "expiryDate": "02-24",
    "cvc": "123"
  },
  "basketId": 1
}
*/
checkoutRouter.post('/', async (req, res) => {
  try {
    const paymentDetails = req.body.paymentDetails;
    const basketId = req.body.basketId;

    // Call checkout function in checkoutInstance
    const result = await checkoutInstance.processPaymentAndCheckout(paymentDetails, basketId);

    res.send(result);
  } catch (error) {
    
    // Check if the error is an instance of your custom error
    if (error.message === 'Invalid payment details. Please provide cardNumber, expiryDate, and cvc.') {
      // Send the custom error message to Postman with a 400 status code
      res.status(400).json({ error: error.message });
    } else {
      // Handle other errors as needed
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


// Route to process payment and checkout by user id
/*
Postman - test
POST    http://localhost:3000/checkout/allItems
Body:
{
  "paymentDetails": {
    "cardNumber": "1234123412341234",
    "expiryDate": "02-24",
    "cvc": "123"
  },
  "userId": 1
}
*/
checkoutRouter.post('/allItems', async (req, res) => {
  try {
    const paymentDetails = req.body.paymentDetails;
    const userId = req.body.userId;

    // Call checkout function in checkoutInstance
    const result = await checkoutInstance.processPaymentAndCheckoutAllItems(paymentDetails, userId);

    res.send(result);
  } catch (error) {
    
    // Check if the error is an instance of your custom error
    if (error.message === 'Invalid payment details. Please provide cardNumber, expiryDate, and cvc.') {
      // Send the custom error message to Postman with a 400 status code
      res.status(400).json({ error: error.message });
    } else {
      // Handle other errors as needed
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


module.exports = checkoutRouter;
