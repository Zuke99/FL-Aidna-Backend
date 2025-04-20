// backend/routes/uploadRoutes.js
const express = require('express');
const { upload } = require('../controllers/uploadController');
const router = express.Router();

// Route to handle single file upload
router.post('/', upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  // Generate the file URL to be sent back to the client
  const fileUrl = `https://media2ai.com/uploads/${req.file.filename}`;
  
  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    url: fileUrl,
  });
});

module.exports = router;