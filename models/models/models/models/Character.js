const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  japaneseName: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  crew: {
    type: String,
    enum: ['Straw Hat Pirates', 'Marines', 'Revolutionaries', 'Shichibukai', 'Yonko', 'Other'],
    required: true
  },
  devilFruit: {
    name: String,
    type: String,
    description: String
  },
  bounty: {
    type: Number
  },
  firstAppearance: {
    manga: String,
    anime: String
  },
  voiceActors: {
    japanese: String,
    english: String
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;