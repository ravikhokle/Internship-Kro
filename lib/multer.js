
const multer  = require('multer')
const path = require('path');

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../public/images/profileImages'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  });

  
  // Initialize Multer with storage configuration
  const upload = multer({ storage });
  // POST route to handle file upload and additional data
  

module.exports = upload;