//1ST VERSION OF SERVER.JS WITH WEBSOCKET
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogsRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const http = require('http');  // Import http module
const WebSocket = require('ws');  // Import ws module
const { initializeWebSocket } = require('./wsHandler');  // Import WebSocket handler
require('dotenv').config();

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

// Middleware
app.use(bodyParser.json());

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Blogs API!');
});

// Routes
app.use('/api/blogs', blogsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);  

// Create HTTP server to handle both Express and WebSocket connections
const server = http.createServer(app);

// Initialize WebSocket server
const wsServer = new WebSocket.Server({ server });
initializeWebSocket(wsServer);  // Initialize WebSocket functionality

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
