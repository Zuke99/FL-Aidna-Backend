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
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
