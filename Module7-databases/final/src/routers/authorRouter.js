// Required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MongoService = require('../services/mongoService');

// Constants
const authorRouter = express.Router();


// Middleware
authorRouter.use(morgan('combined'));
authorRouter.use(bodyParser.urlencoded({ extended: true }));
authorRouter.use(bodyParser.json());

// Routes
authorRouter.route('/')
  .get(async (req, res) => {
    await MongoService.Author.find()
      .exec()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch();
  })
  .post(async (req, res) => {
    const Author = new MongoService.Author(req.body);
    await Author.save()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

authorRouter.route('/:id')
  .get(async (req, res) => {
    await MongoService.Author.findById(req.params.id)
      .exec()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .put(async (req, res) => {
    await MongoService.Author.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete(async (req, res) => {
    await MongoService.Author.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

// Module export
module.exports.routes = authorRouter;
