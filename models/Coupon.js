const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, unique: true, trim: true, uppercase: true },
  discountAmount: { type: Number, required: true, min: 0 },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: false },
  limit: { type: Number, default: 1 },
  couponLimit: { type: Number, default: 1 },
  usersRedeemed: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      count: { type: Number, default: 1 },
    },
  ],
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = Coupon;