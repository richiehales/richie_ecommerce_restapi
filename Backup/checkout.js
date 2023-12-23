const { query } = require('../db/db');
const orderInstance = require('./order.js');

// Validate payment details and copy basket to orders
async function processPaymentAndCheckout(paymentDetails, basketId) {
  console.log(`Checkout Run`)
  try {
    console.log(`Payment Run`)
    // Validate payment details
    const isValidPayment = await validatePaymentDetails(paymentDetails);

    if (!isValidPayment) {
      console.log(`not valid`)
      throw new Error('Invalid payment details.');
    }

    // If payment details are valid, get the basketId from the request body
    
    console.log(basketId)

    // Call copyBasketToOrders function from orderInstance
    const result = await orderInstance.copyBasketToOrders(basketId);

    return result;
  } catch (error) {
    throw error.stack;
  }
}


// Validate payment details
async function validatePaymentDetails(paymentDetails) {
  console.log(paymentDetails)
  try {
    // Check if required fields are present
    if (!paymentDetails || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
      throw new Error('Invalid payment details. Please provide cardNumber, expiryDate, and cvc.');
    }

    // Check if card number is a 16-digit number
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(paymentDetails.cardNumber)) {
      throw new Error('Invalid card number. It should be a 16-digit number.');
    }

    // Check if expiry date is in the format MM-YY
    const expiryDateRegex = /^(0[1-9]|1[0-2])-(\d{2})$/;
    if (!expiryDateRegex.test(paymentDetails.expiryDate)) {
      throw new Error('Invalid expiry date. It should be in the format MM-YY.');
    }

    // Check if cvc is a 3-digit number
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(paymentDetails.cvc)) {
      throw new Error('Invalid CVC. It should be a 3-digit number.');
    }

    // Additional custom validations can be added as needed

    // If all validations pass, return true
    return true;
  } catch (error) {
    // If any validation fails, return false and include the error message
    return { isValid: false, error: error.message };
  }
}

module.exports = {
  processPaymentAndCheckout,
};
