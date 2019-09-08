// Controller for the "author" resource

// const mongo = require('../services/mongoService');
const { Book, Author } = require('../services/sqlService');
const { ResourceNotFoundError, ModelValidationError } = require('../errorHandling/errors/validationErrors');
const AuthorGetDto = require('../dtos/authorGetDto');
const AuthorPutPostDto = require('../dtos/authorPutPostDto');
const mapper = require('../dtos/mappers/authorMapper');

function getAllAuthors(req, res, next) {
  return new Promise((resolve, reject) => {
    // mongo.Author.find().exec()
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send(err));
    //   });
    return Author.findAll({
      include: [
        {
          model: Book,
          required: false,
          attributes: ['title'],
        },
      ],
    })
      .then((data) => {
        const extractedAuthors = mapper.extractAuthorsFromRawResult(data);
        const authorGetDtoList = mapper.getAuthorDtoList(extractedAuthors);
        return resolve(res.status(200).json(authorGetDtoList));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function createAuthor(req, res, next) {
  // const author = new mongo.Author(req.body);
  // author.save()
  //   .then((data) => resolve(res.status(201).json(data)))
  //   .catch((err) => {
  //     console.log(err);
  //     return reject(res.status(500).send());
  //   });
  let authorPutPostDto = {};
  try {
    authorPutPostDto = new AuthorPutPostDto(req.body);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  return Author.create(authorPutPostDto)
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      console.log(err);
      return reject(next(err));
    });
}

function getAuthorById(req, res, next) {
  // mongo.Author.findById(req.params.id).exec()
  //   .then((data) => resolve(res.status(200).json(data)))
  //   .catch((err) => {
  //     console.log(err);
  //     return reject(res.status(500).send());
  //   });
  return Author.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Book,
        required: false,
        attributes: ['title'],
      },
    ],
  })
    .then((data) => {
      if (data === null) return next(new ResourceNotFoundError('Author'));

      const authorGetDto = new AuthorGetDto(data.dataValues);
      return res.status(200).json(authorGetDto);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
}

function updateAuthor(req, res, next) {
  // mongo.Author.findByIdAndUpdate(req.params.id, req.body)
  //   .then((data) => resolve(res.status(200).json(data)))
  //   .catch((err) => {
  //     console.log(err);
  //     return reject(res.status(500).send());
  //   });

  let authorPutPostDto = {};
  try {
    authorPutPostDto = new AuthorPutPostDto(req.body);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  return Author.update(authorPutPostDto, {
    where: { id: req.params.id },
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      return next(err);
    });
}

function deleteAuthor(req, res, next) {
  // mongo.Author.findByIdAndDelete(req.params.id)
  //   .then((data) => resolve(res.status(200).json(data)))
  //   .catch((err) => {
  //     console.log(err);
  //     return reject(res.status(500).send());
  //   });
  return Author.destroy({
    where: { id: req.params.id },
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
}

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
