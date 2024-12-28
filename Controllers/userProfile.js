const mongoose = require('mongoose');
const User = require('../Models/userModel');

const userProfile = async (req, res) => {
    try {

        // Extract _id from query parameters
        const { _id } = req.query;

        // Validate _id
        if (!_id) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid User ID.' });
        }

        // Fetch the user by ID
        const response = await User.findById(_id);

        if (!response) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Send response
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log for debugging
        res.status(500).json({ message: 'Internal Server Error' }); // Generic error for client
    }
};

module.exports = userProfile;
