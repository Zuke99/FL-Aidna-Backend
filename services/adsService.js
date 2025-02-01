const Ads = require("../models/Ads");

const updateOrCreateAds = async (newAds, timer) => {
  let existingAds = await Ads.findOne();

  if (!existingAds) {
    // First-time request → Create a new Ads document
    const newAdsDoc = new Ads({ ads: newAds, timer });
    await newAdsDoc.save();
    return newAdsDoc;
  }

  // Map existing ads for easy lookup
  let updatedAds = [...existingAds.ads];

  // Update or add new ads
  newAds.forEach((newAd) => {
    const index = updatedAds.findIndex(
      (ad) =>
        (ad.priority === newAd.priority && ad.type === "carousel") ||
        (ad.type === "banner" && newAd.type === "banner")
    );

    if (index !== -1) {
      updatedAds[index] = newAd; // Update existing ad
    } else {
      updatedAds.push(newAd); // Add new ad
    }
  });

  // Ensure max 4 carousel ads and 1 banner ad
  const carouselAds = updatedAds.filter((ad) => ad.type === "carousel").slice(0, 4);
  const bannerAd = updatedAds.find((ad) => ad.type === "banner") || null;

  existingAds.ads = bannerAd ? [...carouselAds, bannerAd] : carouselAds;
  existingAds.timer = timer;
  
  await existingAds.save();
  return existingAds;
};

const getAds = async () => {
  const adsData = await Ads.findOne();
  return adsData || { ads: [], timer: 0 };
}

module.exports = { updateOrCreateAds, getAds };
