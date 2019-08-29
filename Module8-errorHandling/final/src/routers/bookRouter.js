// Required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bookController = require('../controllers/bookController');

// Constants
const bookRouter = express.Router();

// Middleware
bookRouter.use(morgan('combined'));
bookRouter.use(bodyParser.urlencoded({ extended: true }));
bookRouter.use(bodyParser.json());

// Routes
bookRouter.route('/')
  .get(async (req, res, next) => await bookController.getAllBooks(req, res, next))
  .post(async (req, res, next) => await bookController.createBook(req, res, next));

bookRouter.route('/:id')
  .get(async (req, res, next) => await bookController.getBookById(req, res, next))
  .put(async (req, res, next) => await bookController.updateBook(req, res, next))
  .delete(async (req, res, next) => await bookController.deleteBook(req, res, next));

bookRouter.route('/:bookId/authors')
  .get(async (req, res, next) => await bookController.getBookAuthors(req, res, next));

bookRouter.route('/:bookId/authors/:authorId')
  .put(async (req, res, next) => await bookController.insertBookAuthor(req, res, next));

// Module export
module.exports.routes = bookRouter;
