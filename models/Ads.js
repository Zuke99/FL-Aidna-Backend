const mongoose = require("mongoose");

// Define the Ad schema
const adSchema = new mongoose.Schema({
  adUrl: { type: String, required: true },
  priority: { type: String, required: true }, // 1 to 4 (for carousel slides)
  type: { type: String, required: true }, // "carousel" or "banner"
  img: { type: String, required: true },
});

// Define the main Ads schema
const adsSchema = new mongoose.Schema({
  ads: {
    type: [adSchema], // Array of 5 slides (4 carousel + 1 banner)
    validate: [(val) => val.length <= 5, "Maximum of 5 ads allowed"], // Ensure max 5 slides
    required: true,
  },
  timer: { type: Number, required: true },
});

// Create and export the model
module.exports = mongoose.model("Ads", adsSchema);
