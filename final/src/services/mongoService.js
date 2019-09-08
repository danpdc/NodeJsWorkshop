// Mongoose service helping us to connect to a Mongo database
const mongoose = require('mongoose');
const book = require('../models/book');
const author = require('../models/author');

class MongoService {
  constructor() {
    mongoose.connect('mongodb://localhost:27017/mylibrary', { useNewUrlParser: true });
    this.Book = book;
    this.Author = author;
  }
}

module.exports = new MongoService();
