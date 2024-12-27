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

const _dirname = path.resolve();

app.use(bodyParser.json());
app.use(cors({origin:"https://internship-kro.onrender.com"}));
app.use('/profile', ProfileRouter);
app.use('/auth', AuthRouter);
app.use('/posts', PostRouter);
app.use(express.json()) 
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'https://internship-kro.onrender.com', allowedHeaders: 'Authorization, Content-Type' }));

app.use(express.static(path.join(_dirname, "/frontend/dist")))

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})
