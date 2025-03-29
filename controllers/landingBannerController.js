const LandingBanner = require("../models/LandingBanner");

const getLandingBanner = async (req, res) => {
  try {
    const banner = await LandingBanner.findOne();
    if (!banner) {
      return res.status(404).json({ message: "No banner found" });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const uploadLandingBanner = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    let banner = await LandingBanner.findOne();

    if (banner) {
      banner.image = image;
      await banner.save();
      return res.status(200).json({ message: "Banner updated", banner });
    } else {
      banner = new LandingBanner({ image });
      await banner.save();
      return res.status(201).json({ message: "Banner created", banner });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getLandingBanner, uploadLandingBanner };
