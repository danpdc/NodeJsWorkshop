const express = require('express');
const morgan = require('morgan');

const bookRouter = express.Router();

bookRouter.use(morgan('combined'))

bookRouter.route('/')
  .get((req, res) => {
    res.json( {books: 'several books'} );
  })
  .post((req, res) => {
    res.json( {book: 'Book created'});
  });

bookRouter.route('/:id')
  .get((req, res) => {
    res.json({title: 'Pro .Net Memory Management', author: 'Konrad Kokosa', yearPublished: 2018});
  })
  .put((req, res) => {
    res.send(`Book with ID ${req.params.id} was updated`);
  })
  .delete((req, res) => {
    res.send(`Book with ID ${req.params.id} was deleted`);
  });

module.exports.routes = bookRouter;


