// Required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MongoService = require('../services/mongoService');
const authorController = require('../controllers/authorController');

// Constants
const authorRouter = express.Router();


// Middleware
authorRouter.use(morgan('combined'));
authorRouter.use(bodyParser.urlencoded({ extended: true }));
authorRouter.use(bodyParser.json());

// Routes
authorRouter.route('/')
  .get(async (req, res, next) => authorController.getAllAuthors(req, res, next))
  .post(async (req, res, next) => authorController.createAuthor(req, res, next));

authorRouter.route('/:id')
  .get(async (req, res, next) => authorController.getAuthorById(req, res, next))
  .put(async (req, res, next) => authorController.updateAuthor(req, res, next))
  .delete(async (req, res, next) => authorController.deleteAuthor(req, res, next));

// Module export
module.exports.routes = authorRouter;
