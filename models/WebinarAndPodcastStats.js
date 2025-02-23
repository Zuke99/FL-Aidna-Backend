const mongoose = require('mongoose');

const webinarAndPodcastStatsSchema = new mongoose.Schema({
  developersAttended: { type: Number, default: 0 },
  studentsEngaged: { type: Number, default: 0 },
  universitiesInvolved: { type: Number, default: 0 },
  sessionsHeld: { type: Number, default: 0 },
  expertSpeakers: { type: Number, default: 0 },
  upskillingGrowth: { type: Number, default: 0 },
});

module.exports = mongoose.model('WebinarAndPodcastStats', webinarAndPodcastStatsSchema, 'webinar_and_podcast_stats'); 