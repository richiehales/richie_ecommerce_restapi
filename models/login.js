const { query } = require('../db/db');

// Get user by email
async function getUserByEmail(data) {
  try{
      const text = 'SELECT * FROM user_info WHERE email = $1;';
      const inputs = [data];
      const result = await query(text, inputs);
      return result.rows;
  } catch(err) {
      throw err.stack;
  }
}


// Add / Register user to user_info table
async function registerUser(hashedPassword, email, first_name, last_name) {
  try {
    
    // Check if the email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser.length > 0) {
      return { success: false, message: 'User already exists' };
    }
    

    // If the email does not exist, proceed with adding the user
    const text = `
      INSERT INTO user_info (password, email, first_name, last_name)
      VALUES ($1, $2, $3, $4)
    `;
    const inputs = [hashedPassword, email, first_name, last_name];
    await query(text, inputs);

    return { success: true, message: 'User successfully registered' };
  } catch (error) {
    throw error.stack;
  }
}


module.exports = {
  registerUser
};