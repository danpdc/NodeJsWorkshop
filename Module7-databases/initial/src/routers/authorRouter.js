// Required modules
const express = require('express');
const morgan = require('morgan');

// Constants
const authorRouter = express.Router();

// Middleware
authorRouter.use(morgan('combined'));

// Routes
authorRouter.route('/')
  .get((req, res) => {
    res.send('This is a list of authors');
  })
  .post((req, res) => {
    res.send('A new author was created');
  });

authorRouter.route('/:id')
  .get((req, res) => {
    res.send(`This is the author with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`The author with ID ${req.params.id} was updated`);
  })
  .delete((req, res) => {
    res.send(`The author with ID ${req.params.id} was deleted`);
  });

// Module export
module.exports.routes = authorRouter;
