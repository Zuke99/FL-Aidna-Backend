// backend/controller/uploadController.js
const multer = require('multer');
const path = require('path');

// Configure multer to store uploaded files in 'uploads/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // Relative to backend folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Export the upload middleware to be used in routes
module.exports = { upload };
