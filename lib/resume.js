const multer  = require('multer')

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../public/resume'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  });
  
  // Initialize Multer with storage configuration
  const uploadresume = multer({ storage });
  // POST route to handle file upload and additional data
  

module.exports = uploadresume;