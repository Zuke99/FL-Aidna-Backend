const uploadService = require("../services/uploadService");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory before uploading to Cloudinary
const upload = multer({ 
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Define allowed mime types
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    
// hello testing

    if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed types: JPEG, PNG, GIF, WEBP, MP4, WEBM, MOV'));
    }
  }
});

const uploadFile = async (req, res) => {
  console.log('called')
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(req.file)
    const result = await uploadService.upload(req.file);
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({
      error: error.message || "Internal Server Error"
    });
  }
};

module.exports = {
  uploadFile,
  uploadMiddleware: upload.single("media"), // Use a single field name for both image and video
};
