const mongoose = require('mongoose');

const webinarAndPodcastUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subscribedOn: { type: Date, default: Date.now },
  organization: { type: String },
  industry: { type: String },
  phone: { type: Number },
  subject: { type: String },
  message: { type: String },
});

module.exports = mongoose.model('WebinarAndPodcastUser', webinarAndPodcastUserSchema, 'webinar_and_podcast_users');  