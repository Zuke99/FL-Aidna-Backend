const cloudinary = require("../storage/storage.js");

const upload = async (file) => {
  console.log("****************************************",file)
  try {
    if (!file || !file.buffer) {
      throw new Error("Invalid file");
    }

    // Determine resource type based on mimetype
    const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';

    // Configure upload options based on resource type
    const uploadOptions = {
      resource_type: resourceType,
      // Common options
      folder: 'events', // Optional: organize uploads in a folder
      
      // Resource-specific options
      ...(resourceType === 'image' && {
        transformation: [
          { quality: 'auto' },
          { fetch_format: 'auto' },
          { width: 1920, crop: 'limit' } // Limit max width while maintaining aspect ratio
        ]
      }),
      
      ...(resourceType === 'video' && {
        chunk_size: 6000000, // 6MB chunks for better upload handling
        eager: [
          { 
            format: 'mp4',
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto' },
              { width: 1920, crop: 'limit' }, // Limit max width while maintaining aspect ratio
              { duration: "300.0" } // Optional: limit video duration to 5 minutes
            ]
          }
        ],
        eager_async: true, // Process video transformations asynchronously
        resource_type: "video"
      })
    };

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Failed to upload file"));
          } else {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
              resource_type: result.resource_type,
              format: result.format,
              ...(result.duration && { duration: result.duration }), // Include duration for videos
            });
          }
        }
      );

      stream.end(file.buffer);
    });

  } catch (error) {
    console.error("Error in upload service:", error);
    throw new Error(error.message || "Failed to upload file");
  }
};

module.exports = {
  upload,
};
