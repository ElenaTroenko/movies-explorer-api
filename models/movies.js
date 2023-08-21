const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const { urlRegex } = require('../utils/constants');

// схема card
const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: function urlValidate(newLink) {
        return urlRegex.test(newLink);
      },
    },
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameEN: {
    required: true,
    type: String,
  },
  nameRU: {
    required: true,
    type: String,
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: function urlValidate(newLink) {
        return urlRegex.test(newLink);
      },
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: function urlValidate(newLink) {
        return urlRegex.test(newLink);
      },
    },
  },
  year: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
