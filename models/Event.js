const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    venue: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: Date, required: true },
    image: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dk5b3f3zr/image/upload/v1628585794/avatars/avatar-1_ukzj6s.png",
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    price: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    availableTickets: { type: Number, required: true },
    isCancelled: { type: Boolean, default: false },
    isSoldOut: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    aboutEvent: { type: String },
    purchasers: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        ticketsPurchased: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        purchasedAt: { type: Date, default: Date.now },
        method: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
