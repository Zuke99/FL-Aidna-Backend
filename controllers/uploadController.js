const uploadService = require('../services/uploadService');

const uploadFile = async (req, res) => {
  try {
    const { imageUrl, target, userId } = req.body;
    const result = await uploadService.upload(imageUrl, target, userId)
    res.json(result)
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  uploadFile
};