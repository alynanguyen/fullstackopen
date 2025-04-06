// const User = require('../models/User'); // Import the User model

// // GET: Get all users
// const getUsers = async (req, res) => {
//     try {
//         const users = await User.find({}).select('-password');
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// };

// // GET: Get a single user by id
// const getUserById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const user = await User.findById(id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch user' });
//     }
// };

// // POST: Create a new user
// const createUser = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Username already exists' });
//         }

//         const newUser = new User({
//             username,
//             password // Normally you would hash the password before saving
//         });

//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// };

// // PUT: Update a user by id
// const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { username, password } = req.body;

//     try {
//         const user = await User.findById(id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         user.username = username || user.username;
//         user.password = password || user.password; // You should hash the password here

//         await user.save();
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to update user' });
//     }
// };

// // DELETE: Delete a user by id
// const deleteUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const user = await User.findById(id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         await user.remove();
//         res.status(204).send(); // No content
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to delete user' });
//     }
// };

// module.exports = {
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser
// };

const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware

// Get a list of all users (this could be made accessible only for admins if needed)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password from response
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get the current logged-in user's data
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
};

// Update the current logged-in user's data
const updateUser = async (req, res) => {
    try {
        // Only allow the logged-in user to modify their own data
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ error: 'You are not allowed to modify this user\'s data' });
        }

        const { username, email } = req.body; // Example fields, add any other fields you need to update
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // Find user by their ID
            { username, email }, // Update fields
            { new: true, runValidators: true } // Return updated user and run validation
        ).select('-password'); // Exclude password from response

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user data' });
    }
};

// Delete the current logged-in user's data
const deleteUser = async (req, res) => {
    try {
        // Only allow the logged-in user to delete their own account
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ error: 'You are not allowed to delete this user\'s account' });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send(); // Return status 204 (no content) after successful deletion
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = {
    getUsers,
    getUserProfile,
    updateUser,
    deleteUser,
};
