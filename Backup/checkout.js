const orderInstance = require('./order.js');

// Validate payment details and copy basket to orders
async function processPaymentAndCheckout(paymentDetails, basketId) {
  try {
    // Validate payment details
    const isValidPayment = await validatePaymentDetails(paymentDetails);

    if (!isValidPayment) {
      // Instead of re-throwing, return a response with a status code and error message
      return { success: false, error: 'Invalid payment details. Please provide cardNumber, expiryDate, and cvc.' };
    }

    // Call copyBasketToOrders function from orderInstance
    const result = await orderInstance.copyBasketToOrders(basketId);

    return { success: true, result };

  } catch (error) {  
    // Return the error message in the response
    return { success: false, error: error.message || 'Internal Server Error in checkout.js' };
  }
}

// Validate payment details
async function validatePaymentDetails(paymentDetails) {
  try {
    // Check if required fields are present
    if (!paymentDetails || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
      throw new Error('Invalid payment details. Please provide cardNumber, expiryDate, and cvc.');
    }

    // Check if card number is a 16-digit number
    // const cardNumberRegex = /^\d{16}$/;
    if (paymentDetails.cardNumber.length !== 16) {
      throw new Error('Invalid card number. It should be a 16-digit number.');
    }

    // Check if expiry date is in the format MM-YY
    const expiryDateRegex = /^(0[1-9]|1[0-2])-(\d{2})$/;
    if (!expiryDateRegex.test(paymentDetails.expiryDate)) {
      throw new Error('Invalid expiry date. It should be in the format MM-YY.');
    }

    // Check if cvc is a 3-digit number
    if (paymentDetails.cvc.length !== 3) {
      throw new Error('Invalid CVC. It should be a 3-digit number.');
    }
    // If all validations pass, return true
    return true;

  } catch (error) {
    // If any validation fails, throw an error with the appropriate error message 
    throw error; // re-throw the error
  }
}

module.exports = {
  processPaymentAndCheckout,
};



