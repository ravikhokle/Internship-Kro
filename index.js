const express = require('express');
const app = express();
require('dotenv').config();
const DBConnect = require("./Models/db");
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const PostRouter = require('./Routes/PostRouter');
const ProfileRouter = require('./Routes/ProfileRouter');
const bodyParser = require("body-parser");
const path = require('path');

const PORT = process.env.PORT || 8000;
DBConnect();

// Use the CORS middleware properly
app.use(cors({
    origin: 'https://internshipkro.netlify.app', // Allowed origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS',      // Allowed methods
    allowedHeaders: ['Authorization', 'Content-Type'], // Allowed headers
}));

// Middleware for JSON parsing
app.use(bodyParser.json());
app.use(express.json());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route middleware
app.use('/profile', ProfileRouter);
app.use('/auth', AuthRouter);
app.use('/posts', PostRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
