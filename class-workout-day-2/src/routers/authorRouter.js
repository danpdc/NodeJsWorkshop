const express = require('express');
const morgan = require('morgan');
const mongo = require('../services/mongoService');

const authorRouter = express.Router();
authorRouter.use(morgan('dev'));

authorRouter.route('/')
  .get((req, res) => new Promise((resolve, reject) => {
    mongo.Author.find().exec()
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send(err));
      });
  }))
  .post((req, res) => new Promise((resolve, reject) => {
    const author = new mongo.Author(req.body);
    author.save()
      .then((data) => resolve(res.status(201).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }));

authorRouter.route('/:id')
  .get((req, res) => new Promise((resolve, reject) => {
    mongo.Author.findById(req.params.id).exec()
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }))
  .put((req, res) => new Promise((resolve, reject) => {
    mongo.Author.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }))
  .delete((req, res) => new Promise((resolve, reject) => {
    mongo.Author.findByIdAndDelete(req.params.id)
      .then((data) => resolve(res.status(200).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(res.status(500).send());
      });
  }));

module.exports.routes = authorRouter;
