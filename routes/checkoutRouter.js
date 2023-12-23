const checkoutRouter = require('express').Router();
const checkoutInstance = require('../models/checkout.js');

// Route to process payment and checkout
/*
Postman - test
POST    http://localhost:3000/checkout
Body:
{
  "paymentDetails": {
    "cardNumber": "1234123412341234",
    "expiryDate": "01-02-24",
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
    // Log the error for debugging purposes
    console.error(error);

    // Check if error is defined and has a 'stack' property
    const errorMessage = error && error.stack ? error.stack : 'Unknown error';

    // Send the error message
    res.status(500).send(errorMessage);
  }
});

module.exports = checkoutRouter;
