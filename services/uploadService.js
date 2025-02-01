const cloudinary = require("../storage/storage.js");

const upload = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error("Invalid file");
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" }, 
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Failed to upload image"));
          } else {
            resolve(result); //  Return result properly
          }
        }
      );

      stream.end(file.buffer); // Send file buffer to Cloudinary
    });

  } catch (error) {
    console.error("Error in upload service:", error);
    throw new Error(error.message || "Failed to upload image");
  }
};

module.exports = {
  upload,
};
