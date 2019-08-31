const Sequelize = require('sequelize');
const BookModel = require('../models/bookSequelize');
const AuthorModel = require('../models/authorSequelize');

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'myLibrary.sqlite',
  operatorsAliases: false,
});

const Book = BookModel(connection, Sequelize);
const Author = AuthorModel(connection, Sequelize);
const BookAuthor = connection.define('bookAuthor', {});

Book.belongsToMany(Author, { through: BookAuthor, unique: false });
Author.belongsToMany(Book, { through: BookAuthor, unique: false });

connection.sync({ logging: console.log, alter: true })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  Book,
  Author,
};
