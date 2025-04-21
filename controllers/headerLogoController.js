const HeaderLogo = require("../models/HeaderLogo")

const getHeaderLogo = async (req, res) => {
  try {
    const result = await HeaderLogo.findOne()
    if (!result) {
      return res.status(404).json({ message: "No logo found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

const uploadHeaderLogo = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({message: 'Logo is required'})
    }

    let logo = await HeaderLogo.findOne();

    if (logo) {
      logo.image = image
      await logo.save()
      return res.status(200).json({message: 'Logo updated', logo})
    } else {
      logo = new HeaderLogo({image});
      await logo.save()
      return res.status(201).json({message: "Logo created", logo})
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = { getHeaderLogo, uploadHeaderLogo }