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
    await MongoService.Book.find()
      .exec()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post(async (req, res) => {
    const Book = new MongoService.Book(req.body);
    await Book.save()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

bookRouter.route('/:id')
  .get(async (req, res) => {
    await MongoService.Book.findById(req.params.id)
      .exec()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put(async (req, res) => {
    await MongoService.Book.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete(async (req, res) => {
    await MongoService.Book.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(200).send(`Book with ID ${req.params.id} was deleted`);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

// Module export
module.exports.routes = bookRouter;
