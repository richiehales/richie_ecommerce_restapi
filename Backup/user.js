const { query } = require('../db/db');


// Get all users
async function getAllUsers() {
  try{
      const result = await query('SELECT * FROM user_info',[]);
      return result.rows;
  } catch(err){
      throw err.stack;
  }
}


// Get user by id
async function getUserById(data) {
  try{
      const text = 'SELECT * FROM user_info WHERE id = $1';
      const inputs = [data];
      const result = await query(text, inputs);
      return result.rows[0];
  } catch(err) {
      throw err.stack;
  }
}


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


// Delete user by id
async function deleteUserById(data) {
  try {
    const text = 'DELETE FROM user_info WHERE id = $1 RETURNING *';
    const inputs = [data];
    const result = await query(text, inputs);

    if (result.rows.length === 0) {
      // Product with the given ID was not found
      return null;
    }

    const deletedUser = result.rows[0];
    const successMessage = `User with id = ${data} deleted from user_info table`;

    return { successMessage, deletedUser };
  } catch (err) {
    throw err.stack;
  }
}


// Add / Register user to user_info table
async function registerUser(password, email, first_name, last_name) {
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
    const inputs = [password, email, first_name, last_name];
    await query(text, inputs);

    return { success: true, message: 'User successfully registered' };
  } catch (error) {
    throw error.stack;
  }
}




// Update user by id
async function updateUserById(id, password, email, first_name, last_name) {
  try {
    const text = `
      UPDATE user_info
      SET password = $2, email = $3, first_name = $4, last_name = $5
      WHERE id = $1
      RETURNING *;
    `;

    const inputs = [id, password, email, first_name, last_name];
    const result = await query(text, inputs);

    if (result.rows.length === 0) {
      // Product with the given ID was not found
      return null;
    }

    const updatedUser = result.rows[0];
    return updatedUser;
  } catch (err) {
    throw err.stack;
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  registerUser,
  updateUserById
};