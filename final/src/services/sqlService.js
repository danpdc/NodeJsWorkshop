// Database service helping us to connect to a SQL database using Sequelize
const Sequelize = require('sequelize');
const book = require('../models/booksql');
const author = require('../models/authorsql');

const connection = new Sequelize('db', 'user', 'pass', {
  host: process.env.SQL_HOST,
  dialect: 'sqlite',
  storage: process.env.SQL_STORAGE,
  operatorAliases: false,
});

const Book = book(connection, Sequelize);
const Author = author(connection, Sequelize);
const BookAuthor = connection.define('bookAuthor', {});

Book.belongsToMany(Author, { through: BookAuthor, unique: false });
Author.belongsToMany(Book, { through: BookAuthor, unique: false });

// connection.sync({ logging: console.log, alter: true })
//   .then(() => {
//     console.log('Database is up and running');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = {
  Book,
  Author,
};
