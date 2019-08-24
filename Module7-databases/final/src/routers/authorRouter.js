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
    const result = await MongoService.Author.find().exec();
    if(result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  })
  .post(async (req, res) => {
    const Author = new MongoService.Author(req.body);
    const result = await Author.save();
    if(result === undefined || result === null) {
      return res.status(500).send('Internal server error');
    }

    return res.status(201).json(result);
  });

authorRouter.route('/:id')
  .get(async (req, res) => {
    const result = await MongoService.Author.findById(req.params.id);
    if(result === undefined || result == null) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(result);
  })
  .put(async (req, res) => {
    const result = await MongoService.Author.findByIdAndUpdate(req.params.id, req.body);
    if(result === undefined || result == null) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(result);
  })
  .delete(async (req, res) => {
    const result = await MongoService.Author.findByIdAndRemove(req.params.id);
    if(result === undefined || result == null) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(result);
  });

// Module export
module.exports.routes = authorRouter;
