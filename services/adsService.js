const Ads = require("../models/Ads");

const updateOrCreateAds = async (newAds, timer) => {
  let existingAds = await Ads.findOne();

  if (!existingAds) {
    // First-time request → Create a new Ads document
    const newAdsDoc = new Ads({ ads: newAds, timer });
    await newAdsDoc.save();
    return newAdsDoc;
  }

  // Keep only ads that exist in newAds
  const updatedAds = newAds.filter((ad) => ad.type === 'carousel').slice(0, 4);

  existingAds.ads = updatedAds;
  existingAds.timer = timer;
  
  await existingAds.save();
  return existingAds;
};


const getAds = async () => {
  const adsData = await Ads.findOne();
  return adsData || { ads: [], timer: 0 };
}

module.exports = { updateOrCreateAds, getAds };
