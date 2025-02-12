  const mongoose = require("mongoose");
  const slugify = require("slugify");

  const eventSchema = new mongoose.Schema(
    {
      priority: { type: Number, required: true, default: 0 },
      title: { type: String, required: true },
      section: { type: String, required: true },
      slug: { type: String, unique: true },
      venue: { type: String, required: true },
      language: { type: String },
      duration: { type: String },
      bestFor: { type: String },
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      time: { type: String, required: true },
      tickets: { type: Number, default: 0 },
      type: { type: String, enum: ["national", "international"], required: true },
      category: { type: String, required: true },
      companies: { type: Number, default: 0 },
      attendies: { type: Number, default: 0 },
      cLevel: { type: Number, default: 0 },
      speakersNum: { type: Number, default: 0 },
      talks: { type: Number, default: 0 },
      exhibits: { type: Number, default: 0 },
      tagline: { type: String },
      image: { type: String, required: true },
      agendas: [
        {
          date: { type: String, required: true },
          agendaItems: [
            {
              time: { type: String, required: true },
              agenda: { type: String, required: true },
            },
          ],
        },
      ],
      speakers: [
        {
          name: { type: String, required: true },
          designation: { type: String, required: true },
          quote: { type: String, required: true },
        },
      ],
      info: { type: String },
      sponsors: [
        {
          image: { type: String, required: true },
          name: { type: String, required: true },
          link: { type: String, required: true },
          tier: { type: String, required: true },
        },
      ],
      benefits: [{ type: String }],
      attendsFor: [
        {
          title: { type: String, required: true },
          attendees: [{ type: String }],
        },
      ],
    },
    { timestamps: true }
  );

  eventSchema.pre("save", function (next) {
    if (!this.slug && this._id) {
      this.slug = slugify(`${this.title}-${this._id}`, { lower: true, strict: true });
    }
    next();
  });

  const Event = mongoose.model("Event", eventSchema);

  module.exports = Event;
