
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../backend/public/images/companyLogos'); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const uploadCompanyLogo = multer({ storage });
  

module.exports = uploadCompanyLogo;