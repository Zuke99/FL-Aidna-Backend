  const mongoose = require("mongoose");
  const slugify = require("slugify");

  const eventSchema = new mongoose.Schema(
    {
      priority: { type: Number, required: false, default: 0 },
      standardPrice: { type: Number, required: false, default: 0 },
      title: { type: String, required: false },
      section: { type: String, required: false },
      slug: { type: String, unique: true },
      venue: { type: String, required: false },
      duration: { type: String },
      targetAudience: { type: String },
      startDate: { type: String, required: false },
      endDate: { type: String, required: false },
      startTime: { type: String, required: false },
      endTime: { type: String, required: false },
      type: { type: String, enum: ["national", "international"], required: false },
      category: { type: String, required: false },
      companies: { type: Number, default: 0 },
      cLevel: { type: Number, default: 0 },
      talks: { type: Number, default: 0 },
      exhibits: { type: Number, default: 0 },
      speakersNum: { type: Number, default: 0 },
      attendees: { type: Number, default: 0 },
      sponsorsNum: { type: Number, default: 0 },
      tagline: { type: String },
      image: { type: String, required: false },
      videoUrl: { type: String, required: false },
      logo: { type: String, required: false },
      vipPrice: { type: Number, default: 0 },
      sponsorPrice: { type: Number, default: 0 },
      agendas: [
        {
          date: { type: String, required: false },
          image: { type: String, required: false },
          agendaItems: [
            {
              time: { type: String, required: false },
              agenda: { type: String, required: false },
            },
          ],
        },
      ],
      speakers: [
        {
          image: { type: String, required: false },
          name: { type: String, required: false },
          designation: { type: String, required: false },
          company: { type: String, required: false },
        },
      ],
      info: { type: String },
      sponsors: [
        {
          image: { type: String, required: false },
          name: { type: String, required: false },
          link: { type: String, required: false },
          tier: { type: String, required: false },
        },
      ],
      benefits: [{ type: String }],
      attendsFor: [
        {
          title: { type: String, required: false },
          attendees: [{ type: String }],
        },
      ],
    },
    { timestamps: true }
  );

  eventSchema.pre("validate", function (next) {
    if (this.isModified("title") || !this.slug) {
      this.slug = slugify(`${this.title}-${this._id}`, {
        lower: true,
        strict: true,
      });
    }
    next();
  });

  const Event = mongoose.model("Event", eventSchema);

  module.exports = Event;
