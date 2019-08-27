const mongoose = require('mongoose');

const Book = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    author: {
      type: String,
    },
    yearPublished: {
      typo: Number,
      min: 0,
    },
    ISBN: {
      type: String,
      required: true,
    },
    copies: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('book', Book);
