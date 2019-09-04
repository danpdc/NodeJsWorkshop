const express = require('express');
const morgan = require('morgan');
const mongo = require('../services/mongoService');
const { Book, Author } = require('../services/sqlService');

const authorRouter = express.Router();
authorRouter.use(morgan('dev'));

authorRouter.route('/')
  .get((req, res) => new Promise((resolve, reject) => {
    // mongo.Author.find().exec()
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send(err));
    //   });
    Author.findAll({
      include: [
        {
          model: Book,
          required: false,
          attributes: ['title'],
        },
      ],
    })
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => reject(res.status(500).send()));
  }))
  .post((req, res) => new Promise((resolve, reject) => {
    // const author = new mongo.Author(req.body);
    // author.save()
    //   .then((data) => resolve(res.status(201).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Author.create(req.body)
      .then((data) => resolve(res.status(201).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }));

authorRouter.route('/:id')
  .get((req, res) => new Promise((resolve, reject) => {
    // mongo.Author.findById(req.params.id).exec()
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Author.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Book,
          required: false,
          attributes: ['title'],
        },
      ],
    })
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }))
  .put((req, res) => new Promise((resolve, reject) => {
    // mongo.Author.findByIdAndUpdate(req.params.id, req.body)
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Author.update(req.body, {
      where: { id: req.params.id },
    })
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }))
  .delete((req, res) => new Promise((resolve, reject) => {
    // mongo.Author.findByIdAndDelete(req.params.id)
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Author.destroy({
      where: { id: req.params.id },
    })
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }));

module.exports.routes = authorRouter;
