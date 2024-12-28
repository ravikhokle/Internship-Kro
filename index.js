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
const allowedOrigins = ['https://internshipkro.netlify.app', 'http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));


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
