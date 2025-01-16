const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'moderator', 'user'], default: 'user' },
  creator: { type: Boolean, default: false },
  totalEvents: { type: Number, default: 0 },
  totalFollowers: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  image: { type: String, default: 'https://res.cloudinary.com/dk5b3f3zr/image/upload/v1628585794/avatars/avatar-1_ukzj6s.png' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
