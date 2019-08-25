// Required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MongoService = require('../services/mongoService');
const { Book, Author } = require('../services/sequelizeService');

// Constants
const bookRouter = express.Router();

// Middleware
bookRouter.use(morgan('combined'));
bookRouter.use(bodyParser.urlencoded({ extended: true }));
bookRouter.use(bodyParser.json());

// Routes
bookRouter.route('/')
  .get(async (req, res) => {
    // const result = await MongoService.Book.find().exec();
    // if(result === undefined || result === null) {
    //   return res.status(500).send('Internal server error')
    // }
    // return res.status(200).json(result);
    var result = await Book.findAll({
      include: [{
        model: Author,
        required: false,
        attributes: ['firstName', 'lastName']
      }]
    });
    if (result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  })
  .post(async (req, res) => {
    //const Book = new MongoService.Book(req.body);
    const result = await Book.create(req.body);
    //const result = await Book.save();
    if (result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  });

bookRouter.route('/:id')
  .get(async (req, res) => {
    //const result = await MongoService.Book.findById(req.params.id).exec();
    const result = await Book.findOne({
      where: { id: req.params.id },
      include: [{ model: Author, required: false, attributes: ['firstName', 'lastName'] }]
    });
    if (result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  })
  .put(async (req, res) => {
    //const result = await MongoService.Book.findByIdAndUpdate(req.params.id, req.body);
    const result = await Book.update(req.body, { where: { id: req.params.id } });
    if (result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  })
  .delete(async (req, res) => {
    //const result = await MongoService.Book.findByIdAndRemove(req.params.id);
    const result = await Book.destroy({ where: { id: req.params.id } });
    if (result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  });

bookRouter.route('/:bookId/authors')
  .get(async (req, res) => {
    const result = await Book.findOne(
      {
        where: {
          id: req.params.bookId
        },
        include: [{ model: Author, required: false, attributes: ['firstName', 'lastName'] }]
      });
    if (result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result.authors);
  });

bookRouter.route('/:bookId/authors/:authorId')
  .put(async (req, res) => {
    const result = await Book.findOne({ where: { id: req.params.bookId } })
    await result.addAuthor(req.params.authorId);
    if (result === undefined || result === null) {
      return res.status(500).send('Internal server error')
    }
    return res.status(200).json(result);
  });

// Module export
module.exports.routes = bookRouter;
