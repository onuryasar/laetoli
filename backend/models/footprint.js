const mongoose = require('mongoose');

const { Schema } = mongoose;

const footprintSchema = new Schema({
  type: { type: String, required: true },
  tmdbId: { type: String, required: true },
  seasonNumber: { type: Number, required: false },
  episodeNumber: { type: Number, required: false },
  date: { type: Date, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Footprint', footprintSchema);
