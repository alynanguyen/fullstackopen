const express = require('express');
const { login, register } = require('../controllers/authController'); // Ensure register is imported
const router = express.Router();

// POST /auth/register - User registration
router.post('/register', register); // Ensure the '/register' endpoint is defined

// POST /auth/login - User login
router.post('/login', login);

module.exports = router;
