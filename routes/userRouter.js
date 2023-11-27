const userRouter = require('express').Router();
const userInstance = require('../models/user.js');

// Get all users
// http://localhost:3000/user
userRouter.get('/', async (req, res) => {

  try{
      const userList = await userInstance.getAllUsers();
      console.log(userList)
      res.json(userList); 
  } catch(err){
      res.status(400).send(err);
  }
})


// Get user by id
// http://localhost:3000/user/1
userRouter.get('/:id', async (req, res) => {

  let id = req.params.id;

  try {
      const user = await userInstance.getUserById(id);
      if(!user) return res.status(404).send('Invalid user number');
      res.json(user);
  } catch(err) {
      res.status(400).send(err);
  }
})


// Get user by email
// http://localhost:3000/user/email/user2@example.com
userRouter.get('/email/:email', async (req, res) => {
  let email = req.params.email;
  console.log("get by email run")

  try {
      const user = await userInstance.getUserByEmail(email);
      if(user.length === 0) return res.status(404).send('User does not exist');
      res.json(user);
  } catch(err) {
      res.status(400).send(err);
  }
})


// Delete user by id
// http://localhost:3000/user/3
userRouter.delete('/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResult = await userInstance.deleteUserById(id);

    if (!deleteResult) {
      return res.status(404).send('Invalid user number');
    }

    // Access the success message and deleted product details
    const { successMessage, deletedUser } = deleteResult;

    // Send the success message and deleted product details in the response
    res.json({ message: successMessage, deletedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});


// Add / Register user to user_info table
/*
Postman - test
POST    http://localhost:3000/user/registerUser
Body: { "password": "password4", "email": "user4@example.com", "first_name": "Richie", "last_name": "Hales" }
*/
userRouter.post('/registerUser', async (req, res) => {
  try {
    const { password, email, first_name, last_name } = req.body;

    if (!password || !email || !first_name || !last_name) {
      return res.status(400).send('Please provide password, email, first_name and last_name in the request body.');
    }

    const registrationResult = await userInstance.registerUser(password, email, first_name, last_name);

    if (registrationResult.success) {
      // Successfully registered
      res.json({ success: true, message: registrationResult.message });
    } else {
      // Failed registration
      res.status(400).json({ success: false, message: registrationResult.message });
    }
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});



// Update user by id
/*
Postman - test
PUT     http://localhost:3000/user/updateUser/4
Body: { { "password": "password4-Updated", "email": "user4@example.com-Updated", "first_name": "Richie-Updated", "last_name": "Hales-Updated" } }
*/
userRouter.put('/updateUser/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const { password, email, first_name, last_name } = req.body;

    if (!password || !email || !first_name || !last_name) {
      return res.status(400).send('Please provide password, email, first_name and last_name in the request body.');
    }

    const updatedUser = await userInstance.updateUserById(id, password, email, first_name, last_name);

    if (!updatedUser) {
      return res.status(404).send('Invalid user id');
    }

    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});

module.exports = userRouter