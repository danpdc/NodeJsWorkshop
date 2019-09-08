// Author router
const express = require('express');
const morgan = require('morgan');
// const mongo = require('../services/mongoService');
const authorController = require('../controllers/authorController');

const authorRouter = express.Router();
authorRouter.use(morgan('dev'));

authorRouter.route('/')
  .get(authorController.getAllAuthors)
  .post(authorController.createAuthor);

authorRouter.route('/:id')
  .get(authorController.getAuthorById)
  .put(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);

module.exports.routes = authorRouter;
