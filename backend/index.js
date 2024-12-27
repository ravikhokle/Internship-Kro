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

// Database Connection
DBConnect();

// Middleware
app.use(cors({ origin: 'https://internship-kro.onrender.com', allowedHeaders: 'Authorization, Content-Type' }));
app.use(bodyParser.json());
app.use(express.json());

// API Routes
app.use('/profile', ProfileRouter);
app.use('/auth', AuthRouter);
app.use('/posts', PostRouter);

// Serve Static Files for Frontend
const rootPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(rootPath));

// Catch-All Route to Serve Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
