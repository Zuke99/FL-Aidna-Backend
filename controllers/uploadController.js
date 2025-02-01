const uploadService = require("../services/uploadService");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory before uploading to Cloudinary
const upload = multer({ storage });

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
    res.status(500).json({error: "Internal Server Error"});
  }
};

module.exports = {
  uploadFile,
  uploadMiddleware: upload.single("image"), // Middleware for handling single file uploads
};
