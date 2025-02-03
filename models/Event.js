const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    priority: { type: Number, required: false },
    title: { type: String, required: true },
    venue: { type: String, required: true },
    language: { type: String },
    duration: { type: String },
    bestFor: {type: String},
    dateTime: { type: Date, required: true },
    tickets: { type: Number, default: 0 },
    type: {enum: ['national', 'international']},
    category: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    image: { type: String, required: false },
    agenda: [
      {
        time: {type: String, required: true },
        agenda: {type: String, required: true },
      }
    ],
    speakers: [
      {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        company: { type: String, required: true },
      },
    ],
    otherInfo: { type: String, required: false },
    benefits: [{ type: String }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
