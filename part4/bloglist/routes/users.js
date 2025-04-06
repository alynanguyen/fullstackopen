// const express = require('express');
// const router = express.Router();
// const usersController = require('../controllers/usersController');

// // GET: Fetch all users
// router.get('/', usersController.getUsers);

// // GET: Fetch a user by id
// router.get('/:id', usersController.getUserById);

// // POST: Create a new user
// router.post('/', usersController.createUser);

// // PUT: Update a user by id
// router.put('/:id', usersController.updateUser);

// // DELETE: Delete a user by id
// router.delete('/:id', usersController.deleteUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getUsers, getUserProfile, updateUser, deleteUser } = require('../controllers/usersController');
const authenticate = require('../middleware/authenticate');

// Routes that require authentication (for PUT and DELETE)
router.get('/', getUsers); // List all users (optional, could be restricted to admins)
router.get('/me', authenticate(), getUserProfile); // Get current logged-in user's profile
router.put('/:id', authenticate(), updateUser); // Update user data
router.delete('/:id', authenticate(), deleteUser); // Delete user

module.exports = router;
