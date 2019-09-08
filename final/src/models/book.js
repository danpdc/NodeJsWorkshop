// Model used for Mongoose
const mongoose = require('mongoose');

const book = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  author: {
    type: String,
  },
  yearPublished: {
    type: Number,
  },

  ISBN: {
    type: String,
  },

  availableCopies: {
    type: Number,
  },
});

module.exports = mongoose.model('book', book);
