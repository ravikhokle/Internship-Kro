const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const DBConnect = require('./Models/db');
const AuthRouter = require('./Routes/AuthRouter');
const PostRouter = require('./Routes/PostRouter');
const ProfileRouter = require('./Routes/ProfileRouter');

const PORT = process.env.PORT || 8000;

// Connect to database
DBConnect();

// CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Authorization', 'Content-Type'], // Allowed headers
}));

// Middleware for JSON parsing
app.use(express.json());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/profile', ProfileRouter);
app.use('/auth', AuthRouter);
app.use('/posts', PostRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
