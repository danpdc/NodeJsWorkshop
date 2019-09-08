// Model used for Mongoose
const mongoose = require('mongoose');

const author = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  yearBorn: {
    type: Number,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = mongoose.model('author', author);
