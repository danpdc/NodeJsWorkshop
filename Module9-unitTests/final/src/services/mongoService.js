const mongoose = require('mongoose');
const author = require('../models/author');
const book = require('../models/book');

class MongoService {
  constructor() {
    mongoose.connect('mongodb://localhost:27017/nodews', { useNewUrlParser: true });
    this.Book = book;
    this.Author = author;
  }
}

module.exports = new MongoService();
