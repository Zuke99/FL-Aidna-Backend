const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "moderator", "user"],
      default: "user",
    },
    creator: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dk5b3f3zr/image/upload/v1628585794/avatars/avatar-1_ukzj6s.png",
    },
    events: [
      {
        eventId: { type: mongoose.Types.ObjectId, ref: "Event" },
        ticketsPurchased: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        purchasedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
