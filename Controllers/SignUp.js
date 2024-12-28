const { json } = require("body-parser");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //const profileImgURL = `http://localhost:5000/public/images/profileImages/${req.file.filename}`;
        const profileImgURL = req.file 
    ? `http://localhost:5000/public/images/profileImages/${req.file.filename}` 
    : null;

if (!profileImgURL) {
    return res.status(400).json({ message: "Profile image is required" });
}

        const userData = await User.findOne({ email });
        if (userData) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const UserModel = new User({ name, email, password, profileImgURL });

        UserModel.password = await bcrypt.hash(password, 10);

        await UserModel.save();

        res.status(201).json({
            message: "SignUp successfully login please",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = SignUp;
