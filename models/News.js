const mongoose = require("mongoose");
const slugify = require("slugify");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    priority: { type: Number, default: 0 },
    label: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    speaker: { type: String, required: true },
    date: {type: String, required: true},
    views: {type: Number, default: 500},
    section: {type: String, required: true},
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

newsSchema.pre("save", function (next) {
  if (!this.slug && this._id) {
    this.slug = slugify(`${this.title}-${this._id}`, {
      lower: true,
      strict: true,
    });
  }
  next();
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
