// const mongo = require('../services/mongoService');
const { Book, Author } = require('../services/sqlService');
const { ResourceNotFoundError, ModelValidationError } = require('../errorHandling/errors/validationErrors');

function getAllBooks(req, res, next) {
  // mongo.Book.find().exec()
  //   .then((data) => {
  //     console.log(data);
  //     resolve(res.status(200).json(data));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     reject(err);
  //   });
  return Book.findAll({
    include: [
      {
        model: Author,
        required: false,
        attributes: ['firstName', 'lastName'],
      },
    ],
  })
    .then((data) => (res.status(200).json(data)))
    .catch((err) => next(err));
}

function createBook(req, res, next) {
  return new Promise((resolve, reject) => {
    // const newBook = new mongo.Book(req.body);
    // newBook.save()
    //   .then((data) => {
    //     resolve(res.status(201).json(data));
    //   })
    //   .catch((err) => {
    //     reject(err);
    //   });
    if (!req.body.title) {
      const error = new ModelValidationError('Book', 'title', 'Title is required');
      console.log(error);
      return reject(next(error));
    }
    return Book.create(req.body)
      .then((data) => resolve(res.status(201).json(data)))
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function getBookById(req, res, next) {
  return new Promise((resolve, reject) => {
    // mongo.Book.findById(req.params.id).exec()
    //   .then((data) => {
    //     console.log(data);
    //     if (!data) return resolve(res.status(404));
    //     return resolve(res.status(200).json(data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(404).send());
    //   });
    Book.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Author,
          required: false,
          attributes: ['firstName', 'lastName'],
        },
      ],
    })
      .then((data) => {
        if (data === null) {
          const error = new ResourceNotFoundError('Book');
          return reject(next(error));
        }
        return resolve(res.status(200).json(data));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function updateBook(req, res, next) {
  return new Promise((resolve, reject) => {
    // mongo.Book.findByIdAndUpdate(req.params.id, req.body)
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Book.update(req.body, {
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data[0] === 0) {
          console.log(data);
          const error = new ResourceNotFoundError('Book');
          return reject(next(error));
        }
        return resolve(res.status(200).json(data));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function deleteBook(req, res, next) {
  return new Promise((resolve, reject) => {
    // mongo.Book.findByIdAndDelete(req.params.id)
    //   .then((data) => resolve(res.status(200).json(data)))
    //   .catch((err) => {
    //     console.log(err);
    //     return reject(res.status(500).send());
    //   });
    Book.destroy({
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data === 0) {
          const error = new ResourceNotFoundError('Book');
          return reject(next(error));
        }
        return resolve(res.status(200).json(data));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function getBookAuthors(req, res, next) {
  return new Promise((resolve, reject) => {
    Book.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Author,
          required: false,
          attributes: ['firstName', 'lastName'],
        },
      ],
    })
      .then((data) => {
        if (data === null) {
          const error = new ResourceNotFoundError('Book');
          reject(next(error));
        }

        return resolve(res.status(200).json(data));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

function addBookAuthor(req, res, next) {
  return new Promise((resolve, reject) => {
    Book.findOne({
      where: {
        id: req.params.bookId,
      },
    })
      .then((book) => {
        if (book === null) {
          const error = new ResourceNotFoundError('Book');
          reject(next(error));
        }
        book.addAuthor(req.params.authorId);
        return resolve(res.status(200).send('Author added to the book'));
      })
      .catch((err) => {
        console.log(err);
        return reject(next(err));
      });
  });
}

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getBookAuthors,
  addBookAuthor,
};
