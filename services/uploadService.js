const cloudinary = require('../storage/storage.js');
const User = require('../models/User');
// const Event = require('../models/Event');

const upload = async (imageUrl, target, userId) => {
  try {
    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageUrl);

    const { secure_url } = uploadResponse;

    let updatedDocument;

    // Update the database based on target
    if (target === 'user') {
      updatedDocument = await User.findByIdAndUpdate(
        userId,
        { image: secure_url },
        { new: true } // Return updated document
      );
    // } else if (target === 'event') {
    //   updatedDocument = await Event.findByIdAndUpdate(
    //     userId, // Assuming this is the event ID
    //     { image: secure_url },
    //     { new: true } // Return updated document
    //   );
    } else {
      throw new Error('Invalid role specified'); // Handle invalid roles
    }

    if (!updatedDocument) {
      throw new Error(`user not found with the provided ID`);
    }

    return {
      message: 'Image uploaded and updated successfully',
      data: updatedDocument,
    };
  } catch (error) {
    console.error('Error in upload service:', error);
    throw new Error(error.message || 'Failed to upload and update document');
  }
};

module.exports = {
  upload,
};
