const adsService = require("../services/adsService");

const manageAds = async (req, res) => {
  try {
    const { ads, timer } = req.body;

    // Validate: Ensure only one banner exists in the request
    const bannerCount = ads.filter((ad) => ad.type === "banner").length;
    if (bannerCount > 1) {
      return res.status(400).json({ message: "Only one banner ad is allowed." });
    }

    // Delegate ad update logic to the service layer
    const updatedAds = await adsService.updateOrCreateAds(ads, timer);

    res.status(200).json({ message: "Ads updated successfully", data: updatedAds });
  } catch (error) {
    console.error("Error managing ads:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAds = async (req, res) => {
  try {
    const adsData = await adsService.getAds();
    res.status(200).json({message: "Ads retrieved successfully", data: adsData})
  } catch (error) {
    console.error("Error retrieving ads:", error);
    res.status(500).json({message: "Internal server error"})
  }
}

module.exports = { manageAds, getAds };
