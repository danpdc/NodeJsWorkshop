const express = require('express');
const morgan = require('morgan');
const mongo = require('../services/mongoService');
const { Book, Author } = require('../services/sqlService');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
bookRouter.use(morgan('dev'));

bookRouter.route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

bookRouter.route('/:id')
  .get(bookController.getBookById)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

bookRouter.route('/:id/authors')
  .get(bookController.getBookAuthors);

bookRouter.route('/:bookId/authors/:authorId')
  .post(bookController.addBookAuthor);


module.exports.routes = bookRouter;
