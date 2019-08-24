// Required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MongoService = require('../services/mongoService');

// Constants
const bookRouter = express.Router();

// Middleware
bookRouter.use(morgan('combined'));
bookRouter.use(bodyParser.urlencoded({ extended: true }));
bookRouter.use(bodyParser.json());

// Routes
bookRouter.route('/')
  .get(async (req, res) => {
    const result = await MongoService.Book.find().exec();
    if(result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  })
  .post(async (req, res) => {
    const Book = new MongoService.Book(req.body);
    const result = await Book.save();
    if(result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  });

bookRouter.route('/:id')
  .get(async (req, res) => {
    const result = await MongoService.Book.findById(req.params.id).exec();
    if(result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  })
  .put(async (req, res) => {
    const result = await MongoService.Book.findByIdAndUpdate(req.params.id, req.body);
    if(result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  })
  .delete(async (req, res) => {
    const result = await MongoService.Book.findByIdAndRemove(req.params.id);
    if(result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  });

// Module export
module.exports.routes = bookRouter;
