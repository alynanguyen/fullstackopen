const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = () => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user data to request
            next(); // Allow the request to continue
        } catch (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    };
};

module.exports = authenticate;
