const express = require('express');
const app = express();
require('dotenv').config();
const DBConnect = require("./Models/db");
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const PostRouter = require('./Routes/PostRouter')
const ProfileRouter = require('./Routes/ProfileRouter');
const bodyParser = require("body-parser");
const path = require('path');

const PORT = process.env.PORT || 8000;
DBConnect();

app.use(bodyParser.json());
app.use('/profile', ProfileRouter);
app.use('/auth', AuthRouter);
app.use('/posts', PostRouter);
app.use(express.json()) 
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:5173', allowedHeaders: 'Authorization, Content-Type' }));


app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})
